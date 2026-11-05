import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { isValidTimeRange, rangeOverlap } from '@src/libs/common/utils/time-range.util';
import { PrismaService } from '@src/prisma/prisma.service';
import { CreateStaffScheduleDto } from './dto/create-staff-schedule.dto';
import { UpdateStaffScheduleDto } from './dto/update-staff-schedule.dto';

@Injectable()
export class ScheduleService {
  constructor(private readonly prismaService: PrismaService) {}

  async getStaffSchedules(staffId: number) {
    const staff = await this.prismaService.client.staff.findUnique({
      where: { id: staffId },
    });

    if (!staff) {
      throw new NotFoundException(`Мастер с id ${staffId} не найден`);
    }

    return this.prismaService.client.staffSchedule.findMany({
      where: { staffId },
      orderBy: [{ dayOfWeek: 'asc' }, { startMinute: 'asc' }],
    });
  }

  async createStaffSchedule(staffId: number, dto: CreateStaffScheduleDto) {
    const staff = await this.prismaService.client.staff.findUnique({
      where: { id: staffId },
    });
    if (!staff) {
      throw new NotFoundException(`Мастер с id ${staffId} не найден`);
    }
    if (!Number.isInteger(dto.dayOfWeek) || dto.dayOfWeek < 0 || dto.dayOfWeek > 6) {
      throw new BadRequestException(`День недели должен быть от 0 до 6`);
    }
    if (!isValidTimeRange(dto.startMinute, dto.endMinute)) {
      throw new BadRequestException(
        `Время начала должно быть от 0 до 1439 и меньше времени окончания`
      );
    }

    const schedules = await this.prismaService.client.staffSchedule.findMany({
      where: {
        staffId,
        dayOfWeek: dto.dayOfWeek,
      },
    });
    const hasOverlap = schedules.some(schedule =>
      rangeOverlap(dto.startMinute, dto.endMinute, schedule.startMinute, schedule.endMinute)
    );
    if (hasOverlap) {
      throw new ConflictException(
        `Время начала и окончания пересекается с существующим расписанием`
      );
    }
    try {
      return await this.prismaService.client.staffSchedule.create({
        data: {
          staffId,
          dayOfWeek: dto.dayOfWeek,
          startMinute: dto.startMinute,
          endMinute: dto.endMinute,
        },
      });
    } catch (error: unknown) {
      if (this.isScheduleOverlapError(error)) {
        throw new ConflictException(
          `Время начала и окончания пересекается с существующим расписанием`
        );
      }
      throw error;
    }
  }
  async updateStaffSchedule(staffId: number, scheduleId: number, dto: UpdateStaffScheduleDto) {
    const staff = await this.prismaService.client.staff.findUnique({
      where: { id: staffId },
    });
    if (!staff) {
      throw new NotFoundException(`Мастер с id ${staffId} не найден`);
    }
    const schedule = await this.prismaService.client.staffSchedule.findFirst({
      where: {
        id: scheduleId,
        staffId,
      },
    });
    if (!schedule) {
      throw new NotFoundException(`Расписание с id ${scheduleId} не найдено`);
    }

    if (!isValidTimeRange(dto.startMinute, dto.endMinute)) {
      throw new BadRequestException(
        `Время начала должно быть от 0 до 1439 и меньше времени окончания`
      );
    }

    const schedules = await this.prismaService.client.staffSchedule.findMany({
      where: {
        staffId,
        dayOfWeek: schedule.dayOfWeek,
        id: {
          not: schedule.id,
        },
      },
    });
    const hasOverlap = schedules.some(schedule =>
      rangeOverlap(dto.startMinute, dto.endMinute, schedule.startMinute, schedule.endMinute)
    );
    if (hasOverlap) {
      throw new ConflictException(
        `Время начала и окончания пересекается с существующим расписанием`
      );
    }
    try {
      return await this.prismaService.client.staffSchedule.update({
        where: {
          id: schedule.id,
        },
        data: {
          startMinute: dto.startMinute,
          endMinute: dto.endMinute,
        },
      });
    } catch (error: unknown) {
      if (this.isScheduleOverlapError(error)) {
        throw new ConflictException(
          `Время начала и окончания пересекается с существующим расписанием`
        );
      }
      throw error;
    }
  }

  private isScheduleOverlapError(error: unknown): boolean {
    if (
      typeof error !== 'object' ||
      error === null ||
      !('code' in error) ||
      error.code !== 'P2004'
    ) {
      return false;
    }

    if (!('meta' in error) || typeof error.meta !== 'object' || error.meta === null) {
      return false;
    }

    return 'constraint' in error.meta && error.meta.constraint === 'staff_schedules_no_overlap';
  }

  async deleteStaffSchedule(staffId: number, scheduleId: number) {
    const staff = await this.prismaService.client.staff.findUnique({
      where: { id: staffId },
    });
    if (!staff) {
      throw new NotFoundException(`Мастер с id ${staffId} не найден`);
    }
    const schedule = await this.prismaService.client.staffSchedule.findFirst({
      where: {
        id: scheduleId,
        staffId,
      },
    });
    if (!schedule) {
      throw new NotFoundException(`Расписание с id ${scheduleId} не найдено`);
    }
    return await this.prismaService.client.staffSchedule.delete({
      where: {
        id: schedule.id,
      },
    });
  }
}
