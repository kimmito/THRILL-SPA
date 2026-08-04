import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class OfferService {
  constructor(private readonly prisma: PrismaService) {}

  getAll() {
    return this.prisma.client.offer.findMany({
      orderBy: {
        id: 'asc',
      },
      include: {
        offerItems: {
          orderBy: {
            sortOrder: 'asc',
          },
        },
      },
    });
  }
}
