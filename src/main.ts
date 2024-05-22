import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // PREFIX
  app.setGlobalPrefix('api/v1');

  // Class Validator
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true
      },
      forbidNonWhitelisted: false,
      errorHttpStatusCode: 422
    })
  );

  // PORT CONFIGURATION
  const port = 3000;
  await app.listen(port).then(x => console.log(`Listen on port ${port}`));
}
bootstrap();
