import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './applications/filter/exception.filter';
import { ApplicationInterceptor } from './applications/interceptor/application.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // PREFIX
  app.setGlobalPrefix('api/v1');

  // FILTER EXCEPTION ERROR
  app.useGlobalFilters(new HttpExceptionFilter());

  // INTERCEPTOR
  app.useGlobalInterceptors(new ApplicationInterceptor())

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
