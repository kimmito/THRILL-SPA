import { Injectable } from '@nestjs/common';
import { PrismaService } from '@src/prisma/prisma.service';
import { StaffDto } from './staff.dto';

@Injectable()
export class StaffService {
  constructor(private readonly prisma: PrismaService) {}
  getAll(): Promise<StaffDto[]> {
    return this.prisma.client.staff.findMany({
      orderBy: {
        sortOrder: 'asc',
      },
      select: {
        id: true,
        name: true,
        photoPath: true,
        role: true,
        isActive: true,
      },
    });
  }
}
