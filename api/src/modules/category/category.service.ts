import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class CategoryService {
  constructor(private readonly prisma: PrismaService) {}

  async getAll() {
    return await this.prisma.client.category.findMany({
      orderBy: {
        sortOrder: 'asc',
      },
      select: {
        id: true,
        name: true,
        slug: true,
      },
    });
  }
}
