import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';
import { UserService } from '../user/user.service';
import { AuthMethod } from '../../../generated/prisma/enums';
import { Request } from 'express';
import { User } from '../../../generated/prisma/client';
import { LoginDto } from './dto/login.dto';
import { verify } from 'argon2';
import { ConfigService } from '@nestjs/config';
import { Response } from 'express';
import { ProviderService } from './provider/provider.service';
import { PrismaService } from '@src/prisma/prisma.service';

@Injectable()
export class AuthService {
  public constructor(
    private readonly prismaService: PrismaService,
    private readonly userService: UserService,
    private readonly configService: ConfigService,
    private readonly providerService: ProviderService
  ) {}
  public async register(req: Request, dto: RegisterDto) {
    const isExists = await this.userService.getByEmail(dto.email);
    if (isExists) {
      throw new ConflictException('Пользователь с таким email уже существует');
    }

    const newUser = await this.userService.create(
      dto.email,
      dto.password,
      dto.name,
      '',
      AuthMethod.CREDENTIALS,
      false
    );
    return this.saveSession(req, newUser);
  }

  public async login(req: Request, dto: LoginDto) {
    const user = await this.userService.getByEmail(dto.email);
    if (!user || !user.password) {
      throw new NotFoundException('Пользователь с таким email не найден');
    }

    const isValidPassword = await verify(user.password, dto.password);
    if (!isValidPassword) {
      throw new UnauthorizedException(
        'Неверный пароль. Пожалуйста, проверьте введенные данные или воспользуйтесь восстановлением пароля.'
      );
    }
    return this.saveSession(req, user);
  }

  public async extractProfileFromCode(req: Request, provider: string, code: string) {
    const providerInstance = this.providerService.findByService(provider);
    if (!providerInstance) {
      throw new NotFoundException('Провайдер не найден');
    }
    const profile = await providerInstance.findUserByCode(code);

    if (!profile) {
      throw new UnauthorizedException('Не удалось получить профиль пользователя');
    }
    const account = await this.prismaService.client.account.findFirst({
      where: {
        id: profile.id,
        provider: profile.provider,
      },
    });

    let user: User | null = null;

    if (account?.userId) {
      user = await this.userService.getById(account.userId);
    }
    if (user) {
      return this.saveSession(req, user);
    }
    user = await this.userService.create(
      profile.email,
      '',
      profile.name,
      profile.picture,
      AuthMethod[profile.provider.toUpperCase() as keyof typeof AuthMethod],
      true
    );

    if (!account) {
      await this.prismaService.client.account.create({
        data: {
          userId: user.id,
          provider: profile.provider,
          accessToken: profile.access_token,
          refreshToken: profile.refresh_token,
          expiresAt: profile.expires_at,
        },
      });
    }
    return this.saveSession(req, user);
  }

  public async logout(req: Request, res: Response): Promise<void> {
    return new Promise((resolve, reject) => {
      req.session.destroy(err => {
        if (err) {
          return reject(new InternalServerErrorException('Ошибка при удалении сессии'));
        }
        res.clearCookie(this.configService.getOrThrow<string>('SESSION_NAME'));
        resolve();
      });
    });
  }

  private saveSession(req: Request, user: User) {
    return new Promise((resolve, reject) => {
      req.session.userId = user.id;
      req.session.save(err => {
        if (err) {
          console.error('Ошибка при сохранении сессии:', err);
          return reject(new InternalServerErrorException('Ошибка при сохранении сессии'));
        }

        resolve({
          user,
        });
      });
    });
  }
}
