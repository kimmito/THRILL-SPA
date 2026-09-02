import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { TypeBaseProviderOptions } from './types/base-provider.options.types';
import { TypeUserInfo } from './types/user-info.types';

interface TokenResponse {
  access_token: string;
  refresh_token?: string;
  expires_in?: number;
  expires_at?: number;
  token_type?: string;
  scope?: string;
}

interface ProviderUserData {
  id?: string | number;
  email?: string;
  name?: string;
  picture?: string;
  [key: string]: any;
}

@Injectable()
export class BaseOAuthService {
  private BASE_URL: string;

  public constructor(
    private readonly options: TypeBaseProviderOptions,
    baseUrl?: string
  ) {
    this.BASE_URL = baseUrl || '';
  }

  protected extractUserInfo(data: ProviderUserData): TypeUserInfo {
    return {
      ...data,
      provider: this.options.name,
    } as TypeUserInfo;
  }

  public getAuthUrl() {
    const query = new URLSearchParams({
      response_type: 'code',
      client_id: this.options.client_id,
      redirect_uri: this.getRedirectUrl(),
      scope: (this.options.scopes ?? []).join(' '),
    });

    return `${this.options.authorize_url}?${query.toString()}`;
  }

  public async findUserByCode({ code }: { code: string }): Promise<TypeUserInfo> {
    const client_id = this.options.client_id;
    const client_secret = this.options.client_secret;

    const tokenQuery = new URLSearchParams({
      client_id,
      client_secret,
      redirect_uri: this.getRedirectUrl(),
      grant_type: 'authorization_code',
      code,
    });

    const tokenRequest = await fetch(this.options.access_url, {
      method: 'POST',
      body: tokenQuery,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Accept: 'application/json',
      },
    });

    const tokenResponse = (await tokenRequest.json()) as TokenResponse;

    if (!tokenRequest.ok) {
      throw new BadRequestException(`Ошибка при получении токена с ${this.options.access_url}.`);
    }

    if (!tokenResponse.access_token) {
      throw new BadRequestException(
        `Нет токенов с ${this.options.access_url}. Убедитесь, что код авторизации действителен.`
      );
    }

    const userRequest = await fetch(this.options.profile_url, {
      headers: {
        Authorization: `Bearer ${tokenResponse.access_token}`,
      },
    });

    if (!userRequest.ok) {
      throw new UnauthorizedException(
        `Ошибка при получении пользователя с ${this.options.profile_url}. Проверьте токен доступа.`
      );
    }

    const user = (await userRequest.json()) as ProviderUserData;
    const userData = this.extractUserInfo(user);

    return {
      ...userData,
      access_token: tokenResponse.access_token,
      refresh_token: tokenResponse.refresh_token,
      expires_at: tokenResponse.expires_in || tokenResponse.expires_at,
      provider: this.options.name,
    };
  }

  public getRedirectUrl() {
    return `${this.BASE_URL}/auth/oauth/callback/${this.options.name}`;
  }

  set baseUrl(value: string) {
    this.BASE_URL = value;
  }

  get name() {
    return this.options.name;
  }

  get access_url() {
    return this.options.access_url;
  }

  get profile_url() {
    return this.options.profile_url;
  }

  get scopes() {
    return this.options.scopes;
  }
}
