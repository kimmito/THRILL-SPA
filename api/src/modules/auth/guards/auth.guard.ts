import { Injectable, CanActivate, UnauthorizedException, ExecutionContext } from '@nestjs/common';
import { UserService } from '@src/modules/user/user.service';
import { Request } from 'express';

@Injectable()
export class AuthGuard implements CanActivate {
  public constructor(private readonly userService: UserService) {}

  public async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();

    const userId = request.session?.userId;

    if (!userId) {
      throw new UnauthorizedException('Пользователь не авторизован');
    }

    const user = await this.userService.getById(userId);

    if (!user) {
      throw new UnauthorizedException('Пользователь не найден');
    }

    request.user = user;

    return true;
  }
}
