import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '@src/prisma/prisma.service';
import { StaffDto } from './staff.dto';

@Injectable()
export class StaffService {
  constructor(private readonly prisma: PrismaService) {}
  async getAll(): Promise<StaffDto[]> {
    const staff = await this.prisma.client.staff.findMany({
      orderBy: {
        sortOrder: 'asc',
      },
      select: {
        id: true,
        name: true,
        photoPath: true,
        role: true,
        isActive: true,
        reviews: {
          orderBy: { date: 'desc' },
          select: {
            id: true,
            stars: true,
            date: true,
            author: true,
            text: true,
            imagePath: true,
          },
        },
        _count: {
          select: { reviews: true },
        },
      },
    });
    return staff.map(this.toStaffDto);
  }
  async getByStaffId(staffId: number) {
    const staff = await this.prisma.client.staff.findUnique({
      where: {
        id: staffId,
        isActive: true,
      },
      select: {
        id: true,
        name: true,
        photoPath: true,
        role: true,
        isActive: true,
        reviews: {
          orderBy: { date: 'desc' },
          select: {
            id: true,
            stars: true,
            date: true,
            author: true,
            text: true,
            imagePath: true,
          },
        },
        _count: {
          select: { reviews: true },
        },
      },
    });
    if (!staff) {
      throw new NotFoundException('Мастер не найден');
    }
    return this.toStaffDto(staff);
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
        reviews: {
          orderBy: { date: 'desc' },
          select: {
            id: true,
            stars: true,
            date: true,
            author: true,
            text: true,
            imagePath: true,
          },
        },
        _count: {
          select: { reviews: true },
        },
      },
    });
    if (!staff || staff.length === 0) {
      throw new NotFoundException(`Мастер не найден или не оказывает выбранную услугу`);
    }
    return staff.map(this.toStaffDto);
  }

  private toStaffDto(staff: {
    id: number;
    name: string;
    photoPath: string;
    role: string;
    isActive: boolean;
    reviews: Array<{ stars: number }>;
    _count: { reviews: number };
  }): StaffDto {
    const rating = staff.reviews.length
      ? staff.reviews.reduce((sum, review) => sum + review.stars, 0) / staff.reviews.length
      : null;

    return {
      id: staff.id,
      name: staff.name,
      photoPath: staff.photoPath,
      role: staff.role,
      isActive: staff.isActive,
      rating,
      reviewCount: staff._count.reviews,
      reviews: staff.reviews as StaffDto['reviews'],
    };
  }
}
