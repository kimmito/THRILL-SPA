import { Module } from '@nestjs/common';
import { OfferModule } from './modules/offer/offer.module';
import { PrismaModule } from './prisma/prisma.module';
import { CategoryModule } from './modules/category/category.module';
import { ServiceModule } from './modules/service/service.module';
import { StaffModule } from './modules/staff/staff.module';
import { PortfolioModule } from './modules/portfolio/portfolio.module';
import { ReviewsModule } from './modules/reviews/reviews.module';
import { ShopModule } from './modules/shop/shop.module';
@Module({
  imports: [
    PrismaModule,
    OfferModule,
    CategoryModule,
    ServiceModule,
    StaffModule,
    PortfolioModule,
    ReviewsModule,
    ShopModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
