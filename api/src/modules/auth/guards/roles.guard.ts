import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UserRole } from '../../../../generated/prisma/enums';
import { ROLES_KEY } from '../decorators/roles.decorator';
import { Request } from 'express';
import { User } from '../../../../generated/prisma/client';

interface RequestWithUser extends Request {
  user: User;
}

@Injectable()
export class RolesGuard implements CanActivate {
  public constructor(private readonly reflector: Reflector) {}

  public canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<UserRole[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    const request = context.switchToHttp().getRequest<RequestWithUser>();
    const user = request.user;

    if (!user) {
      throw new UnauthorizedException('Пользователь не авторизован');
    }

    if (!requiredRoles || requiredRoles.length === 0) {
      return true;
    }

    if (!user.role) {
      throw new ForbiddenException('У пользователя не назначена роль');
    }

    const hasRequiredRole = requiredRoles.includes(user.role);

    if (!hasRequiredRole) {
      throw new ForbiddenException('Доступ запрещен. У вас нет прав для доступа к этому ресурсу.');
    }

    return true;
  }
}
