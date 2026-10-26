import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '@src/prisma/prisma.service';
import { hash } from 'argon2';
import { Account, User } from '../../../generated/prisma/client';
import { AuthMethod } from '../../../generated/prisma/enums';
import { UpdateUserDto } from './dto/update-user.dto';

export type UserWithAccounts = User & {
  accounts?: Account[];
};

export type PublicAccount = Omit<Account, 'accessToken' | 'refreshToken' | 'expiresAt'>;
export type PublicUser = Omit<User, 'password'> & {
  accounts: PublicAccount[];
};

@Injectable()
export class UserService {
  public constructor(private readonly prismaService: PrismaService) {}

  public toPublicUser(user: UserWithAccounts | null): PublicUser | null {
    if (!user) {
      return null;
    }

    const { password: _password, accounts = [], ...rest } = user;
    const sanitizedAccounts: PublicAccount[] = accounts.map((account: Account) => {
      const {
        accessToken: _accessToken,
        refreshToken: _refreshToken,
        expiresAt: _expiresAt,
        ...safeAccount
      } = account;

      void _accessToken;
      void _refreshToken;
      void _expiresAt;

      return safeAccount;
    });

    void _password;

    return {
      ...rest,
      accounts: sanitizedAccounts,
    } satisfies PublicUser;
  }

  public async getPublicProfile(id: string) {
    return this.toPublicUser(await this.getById(id));
  }

  public async getById(id: string): Promise<UserWithAccounts> {
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

  public async getByEmail(email: string): Promise<UserWithAccounts | null> {
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

  public async update(userId: string, dto: UpdateUserDto) {
    const user = await this.getById(userId);
    const updatedUser = await this.prismaService.client.user.update({
      where: { id: user.id },
      data: {
        email: dto.email,
        displayName: dto.name,
      },
      include: {
        accounts: true,
      },
    });
    return this.toPublicUser(updatedUser);
  }
}
