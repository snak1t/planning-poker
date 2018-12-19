import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AuthenticationMiddleware } from './auth/auth.middleware';
import * as express from 'express';

async function bootstrap() {
  const server = express();
  const auth = new AuthenticationMiddleware().resolve();
  server.get('/game', auth);
  const app = await NestFactory.create(AppModule, server);
  await app.listen(3000);
}
bootstrap();
