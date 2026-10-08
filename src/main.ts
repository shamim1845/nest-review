import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Global validation pipe
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true, //strips properties that are not defined in the DTO
    forbidNonWhitelisted: true, // rejects payloads containing extra properties
    transform: true, //transform the payload to the DTO type
  }));

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
