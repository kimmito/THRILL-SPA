import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { BreakService } from './break.service';
import { CreateStaffBreakDto } from './dto/create-staff-break.dto';
import { Authorization } from '@src/modules/auth/decorators/auth.decorator';
import { UserRole } from '../../../../generated/prisma/enums';

@Authorization(UserRole.ADMIN)
@Controller('admin/staff/:staffId/breaks')
export class BreakController {
  constructor(private readonly breakService: BreakService) {}

  @Get()
  public async getStaffBreaks(@Param('staffId', ParseIntPipe) staffId: number) {
    return this.breakService.getStaffBreaks(staffId);
  }

  @Post()
  public async createStaffBreak(
    @Param('staffId', ParseIntPipe) staffId: number,
    @Body() dto: CreateStaffBreakDto
  ) {
    return this.breakService.createStaffBreak(staffId, dto);
  }

  @Patch('/:breakId')
  public async updateStaffBreak(
    @Param('staffId', ParseIntPipe) staffId: number,
    @Param('breakId', ParseIntPipe) breakId: number,
    @Body() dto: CreateStaffBreakDto
  ) {
    return this.breakService.updateStaffBreak(staffId, breakId, dto);
  }

  @Delete('/:breakId')
  public async deleteStaffBreak(
    @Param('staffId', ParseIntPipe) staffId: number,
    @Param('breakId', ParseIntPipe) breakId: number
  ) {
    return this.breakService.deleteStaffBreak(staffId, breakId);
  }
}
