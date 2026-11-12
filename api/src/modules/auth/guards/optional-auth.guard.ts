import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Request } from 'express';
import { UserService } from '@src/modules/user/user.service';

@Injectable()
export class OptionalAuthGuard implements CanActivate {
  public constructor(private readonly userService: UserService) {}

  public async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const userId = request.session?.userId;

    if (!userId) {
      return true;
    }

    try {
      request.user = await this.userService.getById(userId);
    } catch {
      //
    }

    return true;
  }
}