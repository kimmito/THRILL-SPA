import { Injectable } from '@nestjs/common';
import { PrismaService } from '@src/prisma/prisma.service';

@Injectable()
export class ReviewsService {
  constructor(private readonly prisma: PrismaService) {}

  getAll() {
    return this.prisma.client.review.findMany({
      orderBy: { sortOrder: 'asc' },
      select: {
        id: true,
        imagePath: true,
        stars: true,
        date: true,
        author: true,
        text: true,
      },
    });
  }
}
