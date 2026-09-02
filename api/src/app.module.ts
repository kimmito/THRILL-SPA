import { Module } from '@nestjs/common';
import { OfferModule } from './modules/offer/offer.module';
import { PrismaModule } from './prisma/prisma.module';
import { CategoryModule } from './modules/category/category.module';
import { ServiceModule } from './modules/service/service.module';
import { StaffModule } from './modules/staff/staff.module';
import { PortfolioModule } from './modules/portfolio/portfolio.module';
import { ReviewsModule } from './modules/reviews/reviews.module';
import { ShopModule } from './modules/shop/shop.module';
import { IS_DEV_ENV } from './libs/common/utils/is-dev.util';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { ProviderModule } from './modules/auth/provider/provider.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      ignoreEnvFile: !IS_DEV_ENV,
    }),
    PrismaModule,
    AuthModule,
    UserModule,
    OfferModule,
    CategoryModule,
    ServiceModule,
    StaffModule,
    PortfolioModule,
    ReviewsModule,
    ShopModule,
    ProviderModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
