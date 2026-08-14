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

  getByCategoryId(categoryId: number) {
    return this.prisma.client.shopItem.findMany({
      where: {
        shopCategoryId: categoryId,
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

  getBySlug(slug: string) {
    return this.prisma.client.shopItem.findUnique({
      where: {
        slug: slug,
      },
      select: {
        id: true,
        name: true,
        slug: true,
        isActive: true,
        description: true,
        imagePath: true,
        price: true,
        additionalImagePaths: true,
      },
    });
  }
}
