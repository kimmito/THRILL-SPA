import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '@src/prisma/prisma.service';
import { CreateStaffBreakDto } from './dto/create-staff-break.dto';
import { isValidTimeRange, rangeOverlap } from '@src/libs/common/utils/time-range.util';
import { UpdateStaffBreakDto } from './dto/update-staff-break.dto';

@Injectable()
export class BreakService {
  constructor(private readonly prismaService: PrismaService) {}

  async getStaffBreaks(staffId: number) {
    const staff = await this.prismaService.client.staff.findUnique({
      where: { id: staffId },
    });
    if (!staff) {
      throw new NotFoundException(`Мастер с id ${staffId} не найден`);
    }
    return this.prismaService.client.staffBreak.findMany({
      where: { staffId },
      orderBy: [{ dayOfWeek: 'asc' }, { startMinute: 'asc' }],
    });
  }

  async createStaffBreak(staffId: number, dto: CreateStaffBreakDto) {
    if (!Number.isInteger(dto.dayOfWeek) || dto.dayOfWeek < 0 || dto.dayOfWeek > 6) {
      throw new BadRequestException('День недели должен быть от 0 до 6');
    }
    if (!isValidTimeRange(dto.startMinute, dto.endMinute)) {
      throw new BadRequestException(
        'Время начала должно быть от 0 до 1439 и меньше времени окончания'
      );
    }
    const schedules = await this.prismaService.client.staffSchedule.findMany({
      where: {
        staffId,
        dayOfWeek: dto.dayOfWeek,
      },
    });

    const isInsideWorkingHours = schedules.some(
      schedule => dto.startMinute >= schedule.startMinute && dto.endMinute <= schedule.endMinute
    );

    if (!isInsideWorkingHours) {
      throw new BadRequestException('Перерыв должен быть внутри рабочего времени');
    }

    const breaks = await this.prismaService.client.staffBreak.findMany({
      where: {
        staffId,
        dayOfWeek: dto.dayOfWeek,
      },
    });

    const hasOverlap = breaks.some(breakItem =>
      rangeOverlap(dto.startMinute, dto.endMinute, breakItem.startMinute, breakItem.endMinute)
    );

    if (hasOverlap) {
      throw new ConflictException('Перерыв пересекается с существующим перерывом');
    }

    try {
      return await this.prismaService.client.staffBreak.create({
        data: {
          staffId,
          dayOfWeek: dto.dayOfWeek,
          startMinute: dto.startMinute,
          endMinute: dto.endMinute,
        },
      });
    } catch (error: unknown) {
      if (this.isBreakOverlapError(error)) {
        throw new ConflictException('Перерыв пересекается с существующим перерывом');
      }
      throw error;
    }
  }

  async updateStaffBreak(staffId: number, breakId: number, dto: UpdateStaffBreakDto) {
    const breakItem = await this.prismaService.client.staffBreak.findFirst({
      where: {
        id: breakId,
        staffId,
      },
    });
    if (!breakItem) {
      throw new NotFoundException(`Перерыв с id ${breakId} не найден`);
    }

    if (!isValidTimeRange(dto.startMinute, dto.endMinute)) {
      throw new BadRequestException(
        'Время начала должно быть от 0 до 1439 и меньше времени окончания'
      );
    }

    const schedules = await this.prismaService.client.staffSchedule.findMany({
      where: {
        staffId,
        dayOfWeek: breakItem.dayOfWeek,
      },
    });

    const isInsideWorkingHours = schedules.some(
      schedule => dto.startMinute >= schedule.startMinute && dto.endMinute <= schedule.endMinute
    );

    if (!isInsideWorkingHours) {
      throw new BadRequestException('Перерыв должен быть внутри рабочего времени');
    }

    const breaks = await this.prismaService.client.staffBreak.findMany({
      where: {
        staffId,
        dayOfWeek: breakItem.dayOfWeek,
        id: {
          not: breakId,
        },
      },
    });

    const hasOverlap = breaks.some(breakItem =>
      rangeOverlap(dto.startMinute, dto.endMinute, breakItem.startMinute, breakItem.endMinute)
    );

    if (hasOverlap) {
      throw new ConflictException('Перерыв пересекается с существующим перерывом');
    }

    try {
      return await this.prismaService.client.staffBreak.update({
        where: {
          id: breakId,
        },
        data: {
          startMinute: dto.startMinute,
          endMinute: dto.endMinute,
        },
      });
    } catch (error: unknown) {
      if (this.isBreakOverlapError(error)) {
        throw new ConflictException('Перерыв пересекается с существующим перерывом');
      }
      throw error;
    }
  }

  private isBreakOverlapError(error: unknown): boolean {
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

    return 'constraint' in error.meta && error.meta.constraint === 'staff_breaks_no_overlap';
  }

  async deleteStaffBreak(staffId: number, breakId: number) {
    const breakItem = await this.prismaService.client.staffBreak.findFirst({
      where: {
        id: breakId,
        staffId,
      },
    });
    if (!breakItem) {
      throw new NotFoundException(`Перерыв с id ${breakId} не найден`);
    }
    return await this.prismaService.client.staffBreak.delete({
      where: {
        id: breakId,
      },
    });
  }
}
