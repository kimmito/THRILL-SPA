import { Controller, Get, Param } from '@nestjs/common';
import { ShopItemService } from './shop-item.service';

@Controller('shop')
export class ShopItemController {
  constructor(private readonly shopItemService: ShopItemService) {}

  @Get()
  getAll() {
    return this.shopItemService.getAll();
  }

  @Get('by-category/:categorySlug')
  getByCategorySlug(@Param('categorySlug') categorySlug: string) {
    return this.shopItemService.getByCategorySlug(categorySlug);
  }
}
