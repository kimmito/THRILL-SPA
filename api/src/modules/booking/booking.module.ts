import { Module } from '@nestjs/common';
import { ScheduleModule } from './schedule/schedule.module';
import { BreakModule } from './break/break.module';
import { TimeOffModule } from './time-off/time-off.module';
import { AvailabilityModule } from './availability/availability.module';
import { BusinessClosureModule } from './business-closure/business-closure.module';
import { AppointmentsModule } from '@src/modules/booking/appointment/appointment.module';

@Module({
  imports: [
    ScheduleModule,
    BreakModule,
    TimeOffModule,
    AvailabilityModule,
    BusinessClosureModule,
    AppointmentsModule,
  ],
})
export class BookingModule {}
