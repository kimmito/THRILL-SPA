import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { ShopItemService } from './shop-item.service';

@Controller('shop')
export class ShopItemController {
  constructor(private readonly shopItemService: ShopItemService) {}

  @Get()
  getAll() {
    return this.shopItemService.getAll();
  }

  @Get('by-category/:categoryId')
  getByCategoryId(@Param('categoryId', ParseIntPipe) categoryId: number) {
    return this.shopItemService.getByCategoryId(categoryId);
  }

  @Get(':slug')
  getBySlug(@Param('slug') slug: string) {
    return this.shopItemService.getBySlug(slug);
  }
}
