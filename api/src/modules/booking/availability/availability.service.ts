import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '@src/prisma/prisma.service';
import { GetAvailableDatesDto } from './dto/get-available-dates.dto';
import { StaffService } from '@src/modules/staff/staff.service';
import { GetAvailabilityDto } from './dto/get-availability.dto';
import { rangeOverlap } from '@src/libs/common/utils/time-range.util';
@Injectable()
export class AvailabilityService {
  constructor(
    private readonly service: PrismaService,
    private readonly staffService: StaffService
  ) {}

  private async calculateStaffSlots(serviceId: number, staffId: number, date: Date) {
    const dayStart = new Date(date);
    dayStart.setHours(0, 0, 0, 0);
    const dayEnd = new Date(date);
    dayEnd.setDate(dayEnd.getDate() + 1);
    const toDateTime = (minute: number) => {
      const result = new Date(dayStart);
      result.setMinutes(minute);
      return result;
    };
    const service = await this.service.client.service.findFirst({
      where: {
        id: serviceId,
        isActive: true,
        isBookable: true,
      },
      select: {
        id: true,
        name: true,
        durationMinutes: true,
        price: true,
      },
    });
    if (!service) {
      throw new NotFoundException('Услуга не найдена или недоступна для записи');
    }
    const dayOfWeek = date.getDay();

    const schedules = await this.service.client.staffSchedule.findMany({
      where: {
        staffId,
        dayOfWeek,
      },
      orderBy: [{ startMinute: 'asc' }],
    });
    const breaks = await this.service.client.staffBreak.findMany({
      where: {
        staffId,
        dayOfWeek,
      },
    });
    const timeOffs = await this.service.client.staffTimeOff.findMany({
      where: {
        staffId,
        startAt: {
          lt: dayEnd,
        },
        endAt: {
          gt: dayStart,
        },
      },
    });
    const businessClosures = await this.service.client.businessClosure.findMany({
      where: {
        startAt: {
          lt: dayEnd,
        },
        endAt: {
          gt: dayStart,
        },
      },
    });
    const appointments = await this.service.client.appointment.findMany({
      where: {
        startAt: {
          lt: dayEnd,
        },
        endAt: {
          gt: dayStart,
        },
        staffId,
        status: {
          in: ['PENDING', 'CONFIRMED'],
        },
      },
    });
    const slots = [];
    for (const schedule of schedules) {
      for (
        let startMinute = schedule.startMinute;
        startMinute + service.durationMinutes <= schedule.endMinute;
        startMinute += 15
      ) {
        const endMinute = startMinute + service.durationMinutes;
        const overlapsWithBreak = breaks.some(b =>
          rangeOverlap(startMinute, endMinute, b.startMinute, b.endMinute)
        );
        if (overlapsWithBreak) {
          continue;
        }
        const candidateStartAt = toDateTime(startMinute);
        const candidateEndAt = toDateTime(endMinute);
        const overlapsWithTimeOff = timeOffs.some(
          t => candidateStartAt < t.endAt && candidateEndAt > t.startAt
        );
        if (overlapsWithTimeOff) {
          continue;
        }
        const overlapsWithBusinessClosure = businessClosures.some(
          b => candidateStartAt < b.endAt && candidateEndAt > b.startAt
        );
        if (overlapsWithBusinessClosure) {
          continue;
        }
        const overlapsWithAppointment = appointments.some(
          a => candidateStartAt < a.endAt && candidateEndAt > a.startAt
        );
        if (overlapsWithAppointment) {
          continue;
        }
        if (candidateStartAt < new Date()) {
          continue;
        }
        slots.push({
          startAt: candidateStartAt.toISOString(),
          endAt: candidateEndAt.toISOString(),
        });
      }
    }
    return slots;
  }
  async getAvailableSlots(dto: GetAvailabilityDto) {
    // временно
    if (!dto.staffId) {
      throw new BadRequestException('staffId is required');
    }
    const staff = await this.staffService.getByServiceId(dto.serviceId);
    const selectedDate = new Date(dto.date);
    const slots = await this.calculateStaffSlots(dto.serviceId, dto.staffId, selectedDate);

    return {
      date: dto.date,
      staff,
      slots,
    };
  }

  async getAvailableDates(dto: GetAvailableDatesDto) {
    // временно
    if (!dto.staffId) {
      throw new BadRequestException('staffId is required');
    }

    const availableDates: string[] = [];
    for (let offset = 0; offset < 30; offset++) {
      const date = new Date();
      date.setHours(0, 0, 0, 0);
      date.setDate(date.getDate() + offset);
      const slots = await this.calculateStaffSlots(dto.serviceId, dto.staffId, date);
      if (slots.length > 0) {
        availableDates.push(date.toISOString().slice(0, 10));
      }
    }
    return { dates: availableDates };
  }
}
