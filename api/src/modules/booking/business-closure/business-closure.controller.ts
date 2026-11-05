import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { BusinessClosureService } from './business-closure.service';
import { CreateBusinessClosureDto } from './dto/create-business-closure.dto';
import { UpdateBusinessClosureDto } from './dto/update-business-closure.dto';
import { Authorization } from '@src/modules/auth/decorators/auth.decorator';
import { UserRole } from '../../../../generated/prisma/enums';

@Authorization(UserRole.ADMIN)
@Controller('admin/business-closure')
export class BusinessClosureController {
  constructor(private readonly businessClosureService: BusinessClosureService) {}
  @Get()
  getBusinessClosures() {
    return this.businessClosureService.getBusinessClosures();
  }
  @Post()
  create(@Body() dto: CreateBusinessClosureDto) {
    return this.businessClosureService.createBusinessClosure(dto);
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateBusinessClosureDto) {
    return this.businessClosureService.updateBusinessClosure(id, dto);
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.businessClosureService.deleteBusinessClosure(id);
  }
}
