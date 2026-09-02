import { Controller, HttpCode, Get, Param } from '@nestjs/common';
import { UserService } from './user.service';
import { Authorized } from '../auth/decorators/authorized.decorator';
import { HttpStatus } from '@nestjs/common/enums';
import { Authorization } from '../auth/decorators/auth.decorator';
import { UserRole } from '../../../generated/prisma/enums';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Authorization()
  @HttpCode(HttpStatus.OK)
  @Get('profile')
  public async findProfile(@Authorized('id') userId: string) {
    return this.userService.getById(userId);
  }

  @Authorization(UserRole.ADMIN)
  @HttpCode(HttpStatus.OK)
  @Get('by-id/:id')
  public async getById(@Param('id') id: string) {
    return this.userService.getById(id);
  }
}
