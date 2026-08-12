import { Controller, Get } from '@nestjs/common';
import { ShopCategoryService } from './shop-category.service';

@Controller('shop-category')
export class ShopCategoryController {
  constructor(private readonly shopCategoryService: ShopCategoryService) {}

  @Get()
  getAll() {
    return this.shopCategoryService.getAll();
  }
}
