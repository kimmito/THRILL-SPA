import { Module } from '@nestjs/common';
import { ShopCategoryModule } from './shop-category/shop-category.module';
import { ShopItemModule } from './shop-item/shop-item.module';
@Module({
  imports: [ShopCategoryModule, ShopItemModule],
  controllers: [],
  providers: [],
})
export class ShopModule {}
