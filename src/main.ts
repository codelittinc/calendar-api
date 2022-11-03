import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { loadEnvVars } from './configs/loadEnvVars';
import { getSwaggerDocumentConfig, getSwaggerSetupConfig } from './configs/swagger-setup.config';
import { GlobalExceptionFilter } from './filters/global-exception.filter';

async function bootstrap() {
  loadEnvVars();
  const app = await NestFactory.create(AppModule, { cors: true });

  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new GlobalExceptionFilter());

  const swaggerConfig = new DocumentBuilder()
    .setTitle('Calendar API Swagger Documentation - Codelitt')
    .setContact('Codelitt', 'https://www.codelitt.com/', 'hello@codelitt.com')
    .setExternalDoc('API documentation', 'https://github.com/codelittinc/calendar-api#readme')
    .setDescription('This is an API built to create calendars reminders.')
    .setVersion('v1')
    .build();

  const swaggerDocument = SwaggerModule.createDocument(app, swaggerConfig, getSwaggerDocumentConfig());

  SwaggerModule.setup('swagger', app, swaggerDocument, getSwaggerSetupConfig());

  await app.listen(process.env.PORT);
}
bootstrap();
