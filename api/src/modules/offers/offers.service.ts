import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class OffersService {
  constructor(private readonly prisma: PrismaService) {}

  getAll() {
    return this.prisma.client.offer.findMany({
      include: {
        offerItem: true,
      },
    });
  }
}
