import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';

@Injectable()
export class ShopCategoryService {
  constructor(private readonly prisma: PrismaService) {}

  getAll() {
    return this.prisma.client.shopCategory.findMany({
      orderBy: {
        sortOrder: 'asc',
      },
      select: {
        id: true,
        name: true,
        slug: true,
        isActive: true,
      },
    });
  }
}
