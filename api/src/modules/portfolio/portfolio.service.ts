import { Injectable } from '@nestjs/common';
import { PrismaService } from '@src/prisma/prisma.service';

@Injectable()
export class PortfolioService {
  constructor(private readonly prisma: PrismaService) {}

  getAll() {
    return this.prisma.client.portfolio.findMany({
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

  getBySection(section: 'NAILS' | 'BROWS' | 'LASHES') {
    return this.prisma.client.portfolio.findMany({
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
