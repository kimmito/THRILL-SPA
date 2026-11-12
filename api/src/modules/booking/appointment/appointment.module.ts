import { Module } from '@nestjs/common';
import { UserModule } from '@src/modules/user/user.module';
import { OptionalAuthGuard } from '@src/modules/auth/guards/optional-auth.guard';
import { AvailabilityModule } from '../availability/availability.module';
import { AppointmentsService } from './appointment.service';
import { AppointmentsController } from './appointment.controller';

@Module({
  imports: [AvailabilityModule, UserModule],
  controllers: [AppointmentsController],
  providers: [AppointmentsService, OptionalAuthGuard],
})
export class AppointmentsModule {}
