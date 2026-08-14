import { Module } from '@nestjs/common';
import { ShopCategoryModule } from './shop-category/shop-category.module';
import { ShopItemModule } from './shop-item/shop-item.module';
import { PostModule } from './post/post.module';
@Module({
  imports: [ShopCategoryModule, ShopItemModule, PostModule],
  controllers: [],
  providers: [],
})
export class ShopModule {}
