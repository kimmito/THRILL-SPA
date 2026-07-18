import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OffersModule } from './modules/offers/offers.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [PrismaModule, OffersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
