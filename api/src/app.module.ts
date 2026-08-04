import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OfferModule } from './modules/offer/offer.module';
import { PrismaModule } from './prisma/prisma.module';
import { CategoryModule } from './modules/category/category.module';
@Module({
  imports: [PrismaModule, OfferModule, CategoryModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
