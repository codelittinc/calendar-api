import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { loadEnvVars } from './configs/loadEnvVars';
import { getSwaggerDescription, getSwaggerDocumentConfig, getSwaggerSetupConfig } from './configs/swagger-setup.config';
import { GlobalExceptionFilter } from './filters/global-exception.filter';
import { loadDatadogConfig } from './configs/datadog.config';

async function bootstrap() {
  loadEnvVars();
  loadDatadogConfig();
  const app = await NestFactory.create(AppModule, { cors: true });

  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new GlobalExceptionFilter());

  const swaggerConfig = new DocumentBuilder()
    .setTitle('Calendar API Swagger Documentation - Codelitt')
    .setDescription(getSwaggerDescription())
    .setVersion('v1')
    .build();

  const swaggerDocument = SwaggerModule.createDocument(app, swaggerConfig, getSwaggerDocumentConfig());

  SwaggerModule.setup('docs', app, swaggerDocument, getSwaggerSetupConfig());

  await app.listen(process.env.PORT);
}
bootstrap();
