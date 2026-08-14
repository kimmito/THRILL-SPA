import { Injectable } from '@nestjs/common';
import { PrismaService } from '@src/prisma/prisma.service';

@Injectable()
export class PostService {
  constructor(private readonly prisma: PrismaService) {}

  getAll() {
    return this.prisma.client.post.findMany({
      select: {
        id: true,
        title: true,
        description: true,
        slug: true,
        imagePath: true,
        isActive: true,
      },
    });
  }
}
