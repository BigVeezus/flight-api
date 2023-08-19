import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // Validation pipe that helps to filter invalid DTO
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );
  // Application listening on localhost:3000
  await app.listen(3000);
}
bootstrap();
