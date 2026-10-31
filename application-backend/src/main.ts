import * as dotenv from 'dotenv';
dotenv.config();
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { GlobalExceptionFilter } from './common/global-exception.filter';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({ origin: [
    'https://events-alpha-ten.vercel.app',
    'http://localhost:3000',
    'http://localhost:5173',
  ],
  credentials: true, });

  app.useGlobalFilters(new GlobalExceptionFilter());

  const config = new DocumentBuilder()
    .setTitle('Event Management Application API')
    .setDescription('This API handles secure JWT authentication, event CRUD operations, and user participation management.')
    .addBearerAuth()
    .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document); 

    await app.listen(process.env.PORT ?? 8080, '0.0.0.0');
}

bootstrap();
