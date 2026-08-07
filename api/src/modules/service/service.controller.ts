import { Controller, Get, Param } from '@nestjs/common';
import { ServiceService } from './service.service';

@Controller('service')
export class ServiceController {
  constructor(private readonly serviceService: ServiceService) {}

  @Get()
  getAll() {
    return this.serviceService.getAll();
  }

  @Get('category/:categoryId')
  getByCategoryId(@Param('categoryId') categoryId: string) {
    return this.serviceService.getByCategoryId(Number(categoryId));
  }
}
