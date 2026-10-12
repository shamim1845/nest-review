import * as dns from 'dns';
dns.setServers(['8.8.8.8', '1.1.1.1']);

import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { GlobalExceptionFilter } from './filter/global-exception/global-exception.filter';
import { ResponseInterceptor } from './interceptor/response/response.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Global exception filter — handles ALL errors (Mongoose, HTTP, unknown)
  app.useGlobalFilters(new GlobalExceptionFilter());

  // Global response interceptor — wraps all success responses in a consistent envelope
  app.useGlobalInterceptors(new ResponseInterceptor());

  // Global validation pipe
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true, //strips properties that are not defined in the DTO
    forbidNonWhitelisted: true, // rejects payloads containing extra properties
    transform: true, //transform the payload to the DTO type
  }));

  await app.listen(process.env.PORT ?? 3000);
  app.enableShutdownHooks()
}
bootstrap();

