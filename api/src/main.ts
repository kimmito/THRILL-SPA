import 'dotenv/config';

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.enableCors({ origin: true });
  app.enableShutdownHooks();
  await app.listen(process.env.API_PORT ?? process.env.PORT ?? 3000);
}
bootstrap();
