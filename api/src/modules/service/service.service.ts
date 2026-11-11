import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class ServiceService {
  constructor(private readonly prisma: PrismaService) {}

  async getAll() {
    return await this.prisma.client.service.findMany({
      where: {
        isActive: true,
      },
      orderBy: {
        sortOrder: 'asc',
      },
      select: {
        id: true,
        name: true,
        slug: true,
        sortOrder: true,
        price: true,
        durationMinutes: true,
        isBookable: true,
        createdAt: true,
        updatedAt: true,
        categoryId: true,
      },
    });
  }

  async getByCategoryId(categoryId: number) {
    return await this.prisma.client.service.findMany({
      orderBy: {
        sortOrder: 'asc',
      },
      where: {
        categoryId: categoryId,
      },
      select: {
        id: true,
        name: true,
        slug: true,
        sortOrder: true,
        price: true,
        durationMinutes: true,
        isActive: true,
        isBookable: true,
        createdAt: true,
        updatedAt: true,
        categoryId: true,
      },
    });
  }

  async getBySlug(slug: string) {
    return await this.prisma.client.service.findFirst({
      where: {
        slug,
      },
      select: {
        id: true,
        name: true,
        slug: true,
        sortOrder: true,
        price: true,
        durationMinutes: true,
        isActive: true,
        isBookable: true,
        createdAt: true,
        updatedAt: true,
        categoryId: true,
      },
    });
  }
}
