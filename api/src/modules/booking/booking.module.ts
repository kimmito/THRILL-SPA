import { Module } from '@nestjs/common';
import { ScheduleModule } from './schedule/schedule.module';
import { BreakModule } from './break/break.module';
import { TimeOffModule } from './time-off/time-off.module';
import { AvailabilityModule } from './availability/availability.module';
import { AppointmentModule } from './appointment/appointment.module';
import { BusinessClosureModule } from './business-closure/business-closure.module';

@Module({
  imports: [
    ScheduleModule,
    BreakModule,
    TimeOffModule,
    AvailabilityModule,
    AppointmentModule,
    BusinessClosureModule,
  ],
})
export class BookingModule {}
