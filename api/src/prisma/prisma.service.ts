import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '../../generated/prisma/client';
import { Pool } from 'pg';

@Injectable()
export class PrismaService implements OnModuleInit, OnModuleDestroy {
  private readonly pool: Pool;
  readonly client: PrismaClient;

  constructor() {
    const connectionString = process.env.DB_URI;
    if (!connectionString) {
      throw new Error('DB_URI is not set');
    }

    this.pool = new Pool({ connectionString });
    this.client = new PrismaClient({
      adapter: new PrismaPg(this.pool),
    });
  }

  async onModuleInit() {
    await this.client.$connect();
  }

  async onModuleDestroy() {
    await this.client.$disconnect();
    await this.pool.end();
  }
}
