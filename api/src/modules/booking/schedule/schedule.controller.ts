import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { ScheduleService } from './schedule.service';
import { CreateStaffScheduleDto } from './dto/create-staff-schedule.dto';
import { UpdateStaffScheduleDto } from './dto/update-staff-schedule.dto';
import { UserRole } from '../../../../generated/prisma/enums';
import { Authorization } from '@src/modules/auth/decorators/auth.decorator';

@Authorization(UserRole.ADMIN)
@Controller('admin/staff/:staffId/schedule')
export class ScheduleController {
  constructor(private readonly scheduleService: ScheduleService) {}

  @Get()
  getStaffSchedules(@Param('staffId', ParseIntPipe) staffId: number) {
    return this.scheduleService.getStaffSchedules(staffId);
  }

  @Post()
  createStaffSchedule(
    @Param('staffId', ParseIntPipe) staffId: number,
    @Body() dto: CreateStaffScheduleDto
  ) {
    return this.scheduleService.createStaffSchedule(staffId, dto);
  }

  @Patch('/:scheduleId')
  updateStaffSchedule(
    @Param('staffId', ParseIntPipe) staffId: number,
    @Param('scheduleId', ParseIntPipe) scheduleId: number,
    @Body() dto: UpdateStaffScheduleDto
  ) {
    return this.scheduleService.updateStaffSchedule(staffId, scheduleId, dto);
  }

  @Delete('/:scheduleId')
  deleteStaffSchedule(
    @Param('staffId', ParseIntPipe) staffId: number,
    @Param('scheduleId', ParseIntPipe) scheduleId: number
  ) {
    return this.scheduleService.deleteStaffSchedule(staffId, scheduleId);
  }
}
