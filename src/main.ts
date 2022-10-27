import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { loadEnvVars } from './configs/loadEnvVars';
import { getSwaggerDocumentConfig, getSwaggerSetupConfig } from './configs/swagger-setup.config';

async function bootstrap() {
  loadEnvVars();
  const app = await NestFactory.create(AppModule, { cors: true });

  app.useGlobalPipes(new ValidationPipe());

  const swaggerConfig = new DocumentBuilder()
    .setTitle('Calendar API Swagger Documentation - Codelitt')
    .setDescription(
      'This is an API built to be used when creating calendars reminders by [Codelitt](https://www.codelitt.com/).',
    )
    .setVersion('v1')
    .build();

  const swaggerDocument = SwaggerModule.createDocument(app, swaggerConfig, getSwaggerDocumentConfig());

  SwaggerModule.setup('swagger', app, swaggerDocument, getSwaggerSetupConfig());

  await app.listen(process.env.PORT);
}
bootstrap();
