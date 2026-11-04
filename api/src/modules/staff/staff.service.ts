import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '@src/prisma/prisma.service';
import { StaffDto } from './staff.dto';

@Injectable()
export class StaffService {
  constructor(private readonly prisma: PrismaService) {}
  async getAll(): Promise<StaffDto[]> {
    return await this.prisma.client.staff.findMany({
      orderBy: {
        sortOrder: 'asc',
      },
      select: {
        id: true,
        name: true,
        photoPath: true,
        role: true,
        isActive: true,
      },
    });
  }
  async getByServiceId(serviceId: number) {
    const staff = await this.prisma.client.staff.findMany({
      where: {
        isActive: true,
        staffServices: {
          some: {
            serviceId,
          },
        },
      },
      orderBy: {
        sortOrder: 'asc',
      },
      select: {
        id: true,
        name: true,
        photoPath: true,
        role: true,
        isActive: true,
      },
    });
    if (!staff || staff.length === 0) {
      throw new NotFoundException(`Мастер не найден или не оказывает выбранную услугу`);
    }
    return staff;
  }
}
