import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OfferModule } from './modules/offer/offer.module';
import { PrismaModule } from './prisma/prisma.module';
import { CategoryModule } from './modules/category/category.module';
import { ServiceModule } from './modules/service/service.module';
import { StaffModule } from './modules/staff/staff.module';
import { PortfolioModule } from './modules/portfolio/portfolio.module';
@Module({
  imports: [PrismaModule, OfferModule, CategoryModule, ServiceModule, StaffModule, PortfolioModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
