import { Module } from '@nestjs/common';
import { AvailabilityService } from './availability.service';
import { AvailabilityController } from './availability.controller';
import { StaffModule } from '@src/modules/staff/staff.module';

@Module({
  controllers: [AvailabilityController],
  providers: [AvailabilityService],
  imports: [StaffModule],
})
export class AvailabilityModule {}
