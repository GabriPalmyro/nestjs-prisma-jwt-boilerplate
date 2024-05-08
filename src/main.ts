import {
  BadRequestException,
  HttpStatus,
  ValidationPipe,
} from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as cors from 'cors';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Configura as políticas de CORS para permitir todas as origens
  app.use(
    cors({
      origin: '*',
    }),
  );

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
      exceptionFactory: (errors) => {
        return new BadRequestException({
          statusCode: HttpStatus.BAD_REQUEST,
          message: Object.values(errors[0].constraints).toString(),
          error: 'Bad Request',
        });
      },
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('Kriano Server')
    .setDescription('The Best New Saas Course Platform')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  const port = process.env.PORT || 3000;

  await app.listen(port);
}
bootstrap();
