import { Controller, Get, Query } from '@nestjs/common';
import { AvailabilityService } from './availability.service';
import { GetAvailableDatesDto } from './dto/get-available-dates.dto';
import { GetAvailabilityDto } from './dto/get-availability.dto';

@Controller('booking/availability')
export class AvailabilityController {
  constructor(private readonly availabilityService: AvailabilityService) {}
  @Get('dates')
  getAvailableDates(@Query() dto: GetAvailableDatesDto) {
    return this.availabilityService.getAvailableDates(dto);
  }

  @Get()
  getAvailableSlots(@Query() dto: GetAvailabilityDto) {
    return this.availabilityService.getAvailableSlots(dto);
  }
}
