import { ConfigService } from '@nestjs/config';
import { GoogleRecaptchaModuleOptions } from '@nestlab/google-recaptcha';
import { isDev } from '@src/libs/common/utils/is-dev.util';
import { Request } from 'express';

export const getRecaptchaConfig = (configService: ConfigService): GoogleRecaptchaModuleOptions => ({
  secretKey: configService.getOrThrow<string>('GOOGLE_RECAPTCHA_SECRET_KEY'),
  response: (req: Request): string => (req.headers['recaptcha'] as string) || '',
  skipIf: isDev(configService),
});
