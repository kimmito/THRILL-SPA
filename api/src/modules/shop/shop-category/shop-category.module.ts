import { Module } from '@nestjs/common';
import { ShopCategoryService } from './shop-category.service';
import { ShopCategoryController } from './shop-category.controller';

@Module({
  controllers: [ShopCategoryController],
  providers: [ShopCategoryService],
})
export class ShopCategoryModule {}
