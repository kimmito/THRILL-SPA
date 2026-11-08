import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
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

  async getBookableService(serviceId: number) {
    const service = await this.service.client.service.findFirst({
      where: {
        id: serviceId,
        isActive: true,
        isBookable: true,
      },
      select: {
        id: true,
        name: true,
        price: true,
        durationMinutes: true,
      },
    });

    if (!service) {
      throw new NotFoundException('Услуга не найдена или недоступна для записи');
    }

    return service;
  }

  private async getSlotContext(
    staffId: number,
    startAt: Date,
    endAt: Date,
    excludeAppointmentId?: number
  ) {
    const dayStart = new Date(startAt);
    dayStart.setHours(0, 0, 0, 0);
    const dayEnd = new Date(dayStart);
    dayEnd.setDate(dayEnd.getDate() + 1);
    const dayOfWeek = startAt.getDay();

    const [schedules, breaks, timeOffs, businessClosures, appointments] = await Promise.all([
      this.service.client.staffSchedule.findMany({
        where: { staffId, dayOfWeek },
        orderBy: [{ startMinute: 'asc' }],
      }),
      this.service.client.staffBreak.findMany({
        where: { staffId, dayOfWeek },
      }),
      this.service.client.staffTimeOff.findMany({
        where: {
          staffId,
          startAt: { lt: dayEnd },
          endAt: { gt: dayStart },
        },
      }),
      this.service.client.businessClosure.findMany({
        where: {
          startAt: { lt: endAt },
          endAt: { gt: startAt },
        },
      }),
      this.service.client.appointment.findMany({
        where: {
          staffId,
          ...(excludeAppointmentId ? { id: { not: excludeAppointmentId } } : {}),
          startAt: { lt: endAt },
          endAt: { gt: startAt },
          status: { in: ['PENDING', 'CONFIRMED'] },
        },
      }),
    ]);

    return { schedules, breaks, timeOffs, businessClosures, appointments };
  }

  private parseDate(date: string): Date {
    return /^\d{4}-\d{2}-\d{2}$/.test(date) ? new Date(`${date}T00:00:00`) : new Date(date);
  }

  private formatDate(date: Date): string {
    return [
      date.getFullYear(),
      String(date.getMonth() + 1).padStart(2, '0'),
      String(date.getDate()).padStart(2, '0'),
    ].join('-');
  }

  private isSlotAvailable(
    context: Awaited<ReturnType<AvailabilityService['getSlotContext']>>,
    startAt: Date,
    endAt: Date,
    durationMinutes: number
  ): boolean {
    const startMinute = startAt.getHours() * 60 + startAt.getMinutes();
    const endMinute = startMinute + durationMinutes;
    const insideSchedule = context.schedules.some(
      schedule =>
        startMinute >= schedule.startMinute &&
        endMinute <= schedule.endMinute &&
        (startMinute - schedule.startMinute) % 15 === 0
    );

    return (
      insideSchedule &&
      !context.breaks.some(item =>
        rangeOverlap(startMinute, endMinute, item.startMinute, item.endMinute)
      ) &&
      !context.timeOffs.some(item => startAt < item.endAt && endAt > item.startAt) &&
      !context.businessClosures.some(item => startAt < item.endAt && endAt > item.startAt) &&
      !context.appointments.some(item => startAt < item.endAt && endAt > item.startAt)
    );
  }

  async assertSlotAvailable(
    serviceId: number,
    staffId: number,
    startAt: Date,
    excludeAppointmentId?: number
  ): Promise<Date> {
    const service = await this.getBookableService(serviceId);
    const endAt = new Date(startAt.getTime() + service.durationMinutes * 60_000);

    if (startAt < new Date()) {
      throw new BadRequestException('Нельзя записаться на прошедшее время');
    }

    const context = await this.getSlotContext(staffId, startAt, endAt, excludeAppointmentId);
    if (!this.isSlotAvailable(context, startAt, endAt, service.durationMinutes)) {
      throw new ConflictException('Выбранное время недоступно для записи');
    }

    return endAt;
  }

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
    const service = await this.getBookableService(serviceId);
    const context = await this.getSlotContext(staffId, date, dayEnd);
    const slots = [];
    for (const schedule of context.schedules) {
      for (
        let startMinute = schedule.startMinute;
        startMinute + service.durationMinutes <= schedule.endMinute;
        startMinute += 15
      ) {
        const endMinute = startMinute + service.durationMinutes;
        const candidateStartAt = toDateTime(startMinute);
        const candidateEndAt = toDateTime(endMinute);
        if (
          candidateStartAt < new Date() ||
          !this.isSlotAvailable(context, candidateStartAt, candidateEndAt, service.durationMinutes)
        ) {
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
    const selectedDate = this.parseDate(dto.date);
    const staff = await this.staffService.getByServiceId(dto.serviceId);

    if (dto.staffId) {
      const selectedStaff = staff.find(item => item.id === dto.staffId);

      if (!selectedStaff) {
        throw new NotFoundException('Мастер не оказывает выбранную услугу');
      }

      const calculatedSlots = await this.calculateStaffSlots(
        dto.serviceId,
        dto.staffId,
        selectedDate
      );

      return {
        date: this.formatDate(selectedDate),
        mode: 'specific_staff' as const,
        slots: calculatedSlots.map(slot => ({
          ...slot,
          availableStaff: [selectedStaff],
        })),
      };
    }

    const staffWithSlots = await Promise.all(
      staff.map(async currentStaff => ({
        staff: currentStaff,
        slots: await this.calculateStaffSlots(dto.serviceId, currentStaff.id, selectedDate),
      }))
    );

    const groupedSlots = new Map<
      string,
      { startAt: string; endAt: string; availableStaff: typeof staff }
    >();

    for (const item of staffWithSlots) {
      for (const slot of item.slots) {
        const key = `${slot.startAt}_${slot.endAt}`;
        const existingSlot = groupedSlots.get(key);
        if (existingSlot) {
          existingSlot.availableStaff.push(item.staff);
          continue;
        }
        groupedSlots.set(key, {
          startAt: slot.startAt,
          endAt: slot.endAt,
          availableStaff: [item.staff],
        });
      }
    }

    const slots = Array.from(groupedSlots.values()).sort((a, b) =>
      a.startAt.localeCompare(b.startAt)
    );

    return {
      date: this.formatDate(selectedDate),
      mode: 'any_staff' as const,
      slots,
    };
  }

  async getAvailableDates(dto: GetAvailableDatesDto) {
    const availableDates: { date: string; available: boolean }[] = [];
    const staff = await this.staffService.getByServiceId(dto.serviceId);
    const staffIds = dto.staffId ? [dto.staffId] : staff.map(s => s.id);
    if (dto.staffId) {
      if (!staff.some(item => item.id === dto.staffId)) {
        throw new NotFoundException('Мастер не оказывает выбранную услугу');
      }

      for (let offset = 0; offset < 30; offset++) {
        const date = new Date();
        date.setHours(0, 0, 0, 0);
        date.setDate(date.getDate() + offset);
        const slots = await this.calculateStaffSlots(dto.serviceId, dto.staffId, date);
        availableDates.push({ date: this.formatDate(date), available: slots.length > 0 });
      }
      return { staffIds, dates: availableDates };
    }

    for (let offset = 0; offset < 30; offset++) {
      const date = new Date();
      date.setHours(0, 0, 0, 0);
      date.setDate(date.getDate() + offset);

      const staffSlots = await Promise.all(
        staff.map(currentStaff => this.calculateStaffSlots(dto.serviceId, currentStaff.id, date))
      );
      const hasAvailableSlots = staffSlots.some(slots => slots.length > 0);
      availableDates.push({ date: this.formatDate(date), available: hasAvailableSlots });
    }

    return {
      staffIds,
      dates: availableDates,
    };
  }
}
