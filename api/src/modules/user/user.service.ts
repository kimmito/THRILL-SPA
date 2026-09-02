import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '@src/prisma/prisma.service';
import { hash } from 'argon2';
import { AuthMethod } from '../../../generated/prisma/enums';

@Injectable()
export class UserService {
  public constructor(private readonly prismaService: PrismaService) {}

  public async getById(id: string) {
    const user = await this.prismaService.client.user.findUnique({
      where: { id },
      include: {
        accounts: true,
      },
    });
    if (!user) {
      throw new NotFoundException(
        `Пользователь не найден. Пожалуйста, проверьте введенные данные.`
      );
    }
    return user;
  }

  public async getByEmail(email: string) {
    const user = await this.prismaService.client.user.findUnique({
      where: { email },
      include: {
        accounts: true,
      },
    });
    return user;
  }

  public async create(
    email: string,
    password: string,
    displayName: string,
    picture: string,
    method: AuthMethod,
    isVerified: boolean
  ) {
    const user = await this.prismaService.client.user.create({
      data: {
        email,
        password: password ? await hash(password) : '',
        displayName,
        picture,
        isVerified,
        method,
      },
      include: {
        accounts: true,
      },
    });
    return user;
  }
}
