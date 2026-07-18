import { Controller, Get } from '@nestjs/common';
import { OffersService } from './offers.service';

@Controller('offers')
export class OffersController {
  constructor(private readonly offersService: OffersService) {}

  @Get()
  getAll() {
    return this.offersService.getAll();
  }
}
