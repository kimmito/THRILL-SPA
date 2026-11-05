import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  Req,
} from '@nestjs/common';
import { Request } from 'express';
import { UserRole } from '../../../../generated/prisma/enums';
import { Authorization } from '@src/modules/auth/decorators/auth.decorator';
import { Authorized } from '@src/modules/auth/decorators/authorized.decorator';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { RescheduleAppointmentDto } from './dto/reschedule-appointment.dto';
import { AppointmentsService } from './appointment.service';

@Controller('appointments')
export class AppointmentsController {
  constructor(private readonly appointmentsService: AppointmentsService) {}

  @Post()
  createAppointment(@Body() dto: CreateAppointmentDto, @Req() req: Request) {
    return this.appointmentsService.createAppointment(dto, req.user);
  }

  @Get('my')
  @Authorization()
  getMyAppointments(@Authorized('id') userId: string) {
    return this.appointmentsService.getMyAppointments(userId);
  }

  @Patch('cancel/:appointmentId')
  @Authorization()
  cancelAppointment(
    @Authorized('id') userId: string,
    @Param('appointmentId', ParseIntPipe) appointmentId: number
  ) {
    return this.appointmentsService.cancelAppointment(userId, appointmentId);
  }

  @Patch('guest/cancel/:appointmentId')
  cancelGuestAppointment(
    @Param('appointmentId', ParseIntPipe) appointmentId: number,
    @Query('token') token: string
  ) {
    return this.appointmentsService.cancelGuestAppointment(appointmentId, token);
  }

  @Patch('admin/cancel/:appointmentId')
  @Authorization(UserRole.ADMIN)
  cancelAppointmentAsAdmin(@Param('appointmentId', ParseIntPipe) appointmentId: number) {
    return this.appointmentsService.cancelAppointmentAsAdmin(appointmentId);
  }

  @Patch('admin/reschedule/:appointmentId')
  @Authorization(UserRole.ADMIN)
  rescheduleAppointment(
    @Param('appointmentId', ParseIntPipe) appointmentId: number,
    @Body() dto: RescheduleAppointmentDto
  ) {
    return this.appointmentsService.rescheduleAppointment(appointmentId, dto);
  }
}
