import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '@src/prisma/prisma.service';
import { CreateBusinessClosureDto } from './dto/create-business-closure.dto';
import { UpdateBusinessClosureDto } from './dto/update-business-closure.dto';

@Injectable()
export class BusinessClosureService {
  constructor(private readonly prisma: PrismaService) {}
  async getBusinessClosures() {
    return await this.prisma.client.businessClosure.findMany({
      orderBy: [{ startAt: 'asc' }],
    });
  }

  async createBusinessClosure(dto: CreateBusinessClosureDto) {
    const { startAt, endAt } = this.parseRange(dto.startAt, dto.endAt);
    const overlap = await this.prisma.client.businessClosure.findFirst({
      where: {
        startAt: { lt: endAt },
        endAt: { gt: startAt },
      },
    });

    if (overlap) {
      throw new ConflictException('Пересечение с существующим периодом');
    }

    try {
      return await this.prisma.client.businessClosure.create({
        data: { startAt, endAt, reason: dto.reason },
      });
    } catch (error: unknown) {
      if (this.isOverlapError(error)) {
        throw new ConflictException('Пересечение с существующим периодом');
      }
      throw error;
    }
  }

  async updateBusinessClosure(businessClosureId: number, dto: UpdateBusinessClosureDto) {
    const existing = await this.prisma.client.businessClosure.findUnique({
      where: { id: businessClosureId },
    });

    if (!existing) {
      throw new NotFoundException(`Закрытие с id ${businessClosureId} не найдено`);
    }

    const { startAt, endAt } = this.parseRange(
      dto.startAt ?? existing.startAt.toISOString(),
      dto.endAt ?? existing.endAt.toISOString()
    );
    const overlap = await this.prisma.client.businessClosure.findFirst({
      where: {
        startAt: { lt: endAt },
        endAt: { gt: startAt },
        id: { not: businessClosureId },
      },
    });

    if (overlap) {
      throw new ConflictException('Пересечение с существующим периодом');
    }

    try {
      return await this.prisma.client.businessClosure.update({
        where: { id: businessClosureId },
        data: {
          startAt,
          endAt,
          reason: dto.reason === undefined ? existing.reason : dto.reason,
        },
      });
    } catch (error: unknown) {
      if (this.isRecordNotFoundError(error)) {
        throw new NotFoundException(`Закрытие с id ${businessClosureId} не найдено`);
      }
      if (this.isOverlapError(error)) {
        throw new ConflictException('Пересечение с существующим периодом');
      }
      throw error;
    }
  }

  private parseRange(startValue: string, endValue: string) {
    const startAt = new Date(startValue);
    const endAt = new Date(endValue);

    if (Number.isNaN(startAt.getTime()) || Number.isNaN(endAt.getTime())) {
      throw new BadRequestException('Некорректные даты начала или окончания');
    }
    if (startAt >= endAt) {
      throw new BadRequestException('Дата начала должна быть меньше даты окончания');
    }

    return { startAt, endAt };
  }

  private isOverlapError(error: unknown): boolean {
    return this.hasPrismaError(error, 'P2004', 'business_closures_no_overlap');
  }

  private isRecordNotFoundError(error: unknown): boolean {
    return this.hasPrismaError(error, 'P2025');
  }

  private hasPrismaError(error: unknown, code: string, constraint?: string): boolean {
    if (
      typeof error !== 'object' ||
      error === null ||
      !('code' in error) ||
      error.code !== code ||
      !('meta' in error) ||
      typeof error.meta !== 'object' ||
      error.meta === null
    ) {
      return constraint === undefined && typeof error === 'object';
    }

    return (
      constraint === undefined ||
      ('constraint' in error.meta && error.meta.constraint === constraint)
    );
  }

  async deleteBusinessClosure(businessClosureId: number) {
    const existing = await this.prisma.client.businessClosure.findUnique({
      where: { id: businessClosureId },
    });

    if (!existing) {
      throw new NotFoundException(`Закрытие с id ${businessClosureId} не найдено`);
    }

    return await this.prisma.client.businessClosure.delete({
      where: { id: businessClosureId },
    });
  }
}
