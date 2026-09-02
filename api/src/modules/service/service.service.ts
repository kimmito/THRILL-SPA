import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class ServiceService {
  constructor(private readonly prisma: PrismaService) {}

  async getAll() {
    return await this.prisma.client.service.findMany({
      orderBy: {
        sortOrder: 'asc',
      },
      select: {
        id: true,
        name: true,
        slug: true,
        sortOrder: true,
        price: true,
        isActive: true,
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
        isActive: true,
        categoryId: true,
      },
    });
  }

  async getBySlug(slug: string) {
    return await this.prisma.client.service.findFirst({
      where: {
        name: slug,
      },
      select: {
        id: true,
        name: true,
        slug: true,
        sortOrder: true,
        price: true,
        isActive: true,
        categoryId: true,
      },
    });
  }
}
