import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { TimeOffService } from './time-off.service';
import { CreateTimeOffDto } from './dto/create-time-off.dto';
import { Authorization } from '@src/modules/auth/decorators/auth.decorator';
import { UserRole } from '../../../../generated/prisma/enums';

@Authorization(UserRole.ADMIN)
@Controller('admin/staff/:staffId/time-off')
export class TimeOffController {
  constructor(private readonly timeOffService: TimeOffService) {}
  @Get()
  public async getStaffTimeOffs(@Param('staffId', ParseIntPipe) staffId: number) {
    return await this.timeOffService.getStaffTimeOffs(staffId);
  }
  @Post()
  public async createStaffTimeOff(
    @Param('staffId', ParseIntPipe) staffId: number,
    @Body() dto: CreateTimeOffDto
  ) {
    return await this.timeOffService.createStaffTimeOff(staffId, dto);
  }

  @Patch('/:timeOffId')
  public async updateStaffTimeOff(
    @Param('staffId', ParseIntPipe) staffId: number,
    @Param('timeOffId', ParseIntPipe) timeOffId: number,
    @Body() dto: CreateTimeOffDto
  ) {
    return await this.timeOffService.updateStaffTimeOff(staffId, timeOffId, dto);
  }

  @Delete('/:timeOffId')
  public async deleteStaffTimeOff(
    @Param('staffId', ParseIntPipe) staffId: number,
    @Param('timeOffId', ParseIntPipe) timeOffId: number
  ) {
    return await this.timeOffService.deleteStaffTimeOff(staffId, timeOffId);
  }
}
