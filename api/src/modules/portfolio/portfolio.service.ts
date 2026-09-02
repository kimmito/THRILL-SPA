import { Injectable } from '@nestjs/common';
import { PrismaService } from '@src/prisma/prisma.service';

@Injectable()
export class PortfolioService {
  constructor(private readonly prisma: PrismaService) {}

  async getAll() {
    return await this.prisma.client.portfolio.findMany({
      orderBy: {
        sortOrder: 'asc',
      },
      select: {
        id: true,
        section: true,
        imagePath: true,
        sortOrder: true,
        isActive: true,
        createdAt: true,
      },
    });
  }

  async getBySection(section: 'NAILS' | 'BROWS' | 'LASHES') {
    return await this.prisma.client.portfolio.findMany({
      where: {
        section: section,
      },
      orderBy: {
        sortOrder: 'asc',
      },
      select: {
        id: true,
        section: true,
        imagePath: true,
        sortOrder: true,
        isActive: true,
        createdAt: true,
      },
    });
  }
}
