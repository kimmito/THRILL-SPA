import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '../../generated/prisma/client';
import { Pool } from 'pg';

@Injectable()
export class PrismaService implements OnModuleInit, OnModuleDestroy {
  private readonly pool = new Pool({
    connectionString: process.env.DATABASE_URL,
  });

  readonly client = new PrismaClient({
    adapter: new PrismaPg(this.pool),
  });

  async onModuleInit() {
    await this.client.$connect();
  }

  async onModuleDestroy() {
    await this.client.$disconnect();
    await this.pool.end();
  }
}
