import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { StaffService } from './staff.service';
import { StaffDto } from './staff.dto';
@Controller('staff')
export class StaffController {
  constructor(private readonly staffService: StaffService) {}
  @Get()
  getAll(): Promise<StaffDto[]> {
    return this.staffService.getAll();
  }
  @Get('by-service/:serviceId')
  getByServiceId(@Param('serviceId', ParseIntPipe) serviceId: number) {
    return this.staffService.getByServiceId(serviceId);
  }
}
