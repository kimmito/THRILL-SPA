import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';

@Injectable()
export class ShopItemService {
  constructor(private readonly prisma: PrismaService) {}

  getAll() {
    return this.prisma.client.shopItem.findMany({
      orderBy: {
        sortOrder: 'asc',
      },
      select: {
        id: true,
        name: true,
        slug: true,
        isActive: true,
        description: true,
        imagePath: true,
        price: true,
      },
    });
  }

  getByCategorySlug(categorySlug: string) {
    return this.prisma.client.shopItem.findMany({
      where: {
        slug: categorySlug,
      },
      orderBy: {
        sortOrder: 'asc',
      },
      select: {
        id: true,
        name: true,
        slug: true,
        isActive: true,
        description: true,
        imagePath: true,
        price: true,
      },
    });
  }
}
