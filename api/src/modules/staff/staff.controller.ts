import { Controller, Get } from '@nestjs/common';
import { StaffService } from './staff.service';
import { StaffDto } from './staff.dto';
@Controller('staff')
export class StaffController {
  constructor(private readonly staffService: StaffService) {}
  @Get()
  getAll(): Promise<StaffDto[]> {
    return this.staffService.getAll();
  }
}
