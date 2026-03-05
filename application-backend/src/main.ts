import * as dotenv from 'dotenv';
dotenv.config();
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { GlobalExceptionFilter } from './common/global-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(8080, '127.0.0.1');
  app.useGlobalFilters(new GlobalExceptionFilter());
  await app.listen(3000);
}

bootstrap();
