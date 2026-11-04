import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '@src/prisma/prisma.service';
import { CreateTimeOffDto } from './dto/create-time-off.dto';
import { UpdateTimeOffDto } from './dto/update-time-off.dto';
@Injectable()
export class TimeOffService {
  constructor(private readonly prisma: PrismaService) {}

  async getStaffTimeOffs(staffId: number) {
    const staff = await this.prisma.client.staff.findUnique({
      where: { id: staffId },
    });
    if (!staff) {
      throw new NotFoundException(`Мастер с id ${staffId} не найден`);
    }
    return await this.prisma.client.staffTimeOff.findMany({
      where: { staffId },
      orderBy: [{ startAt: 'asc' }],
    });
  }

  async createStaffTimeOff(staffId: number, dto: CreateTimeOffDto) {
    const staff = await this.prisma.client.staff.findUnique({
      where: { id: staffId },
    });
    if (!staff) {
      throw new NotFoundException(`Мастер с id ${staffId} не найден`);
    }
    const startAt = new Date(dto.startAt);
    const endAt = new Date(dto.endAt);
    if (Number.isNaN(startAt.getTime()) || Number.isNaN(endAt.getTime())) {
      throw new BadRequestException('Некорректные даты начала или окончания');
    }
    if (startAt >= endAt) {
      throw new BadRequestException('Дата начала должна быть меньше даты окончания');
    }

    const overlap = await this.prisma.client.staffTimeOff.findFirst({
      where: {
        staffId,
        startAt: {
          lt: endAt,
        },
        endAt: {
          gt: startAt,
        },
      },
    });
    if (overlap) {
      throw new BadRequestException('Пересечение с существующим периодом отсутствия');
    }
    return await this.prisma.client.staffTimeOff.create({
      data: {
        staffId,
        startAt,
        endAt,
        reason: dto.reason,
      },
    });
  }

  async updateStaffTimeOff(staffId: number, timeOffId: number, dto: UpdateTimeOffDto) {
    const staff = await this.prisma.client.staff.findUnique({
      where: { id: staffId },
    });
    if (!staff) {
      throw new NotFoundException(`Мастер с id ${staffId} не найден`);
    }
    const startAt = new Date(dto.startAt);
    const endAt = new Date(dto.endAt);
    if (Number.isNaN(startAt.getTime()) || Number.isNaN(endAt.getTime())) {
      throw new BadRequestException('Некорректные даты начала или окончания');
    }
    if (startAt >= endAt) {
      throw new BadRequestException('Дата начала должна быть меньше даты окончания');
    }

    const overlap = await this.prisma.client.staffTimeOff.findFirst({
      where: {
        staffId,
        startAt: {
          lt: endAt,
        },
        endAt: {
          gt: startAt,
        },
        id: {
          not: timeOffId,
        },
      },
    });
    if (overlap) {
      throw new BadRequestException('Пересечение с существующим периодом отсутствия');
    }
    return await this.prisma.client.staffTimeOff.update({
      where: { id: timeOffId },
      data: {
        startAt,
        endAt,
        reason: dto.reason,
      },
    });
  }

  async deleteStaffTimeOff(staffId: number, timeOffId: number) {
    const staff = await this.prisma.client.staff.findUnique({
      where: { id: staffId },
    });
    if (!staff) {
      throw new NotFoundException(`Мастер с id ${staffId} не найден`);
    }
    return await this.prisma.client.staffTimeOff.delete({
      where: { id: timeOffId },
    });
  }
}
