import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { loadEnvVars } from './configs/loadEnvVars';

async function bootstrap() {
  loadEnvVars();
  const app = await NestFactory.create(AppModule, { cors: true });

  const swaggerConfig = new DocumentBuilder()
    .setTitle('Calendar API Documentation - Codelitt')
    .setVersion('v1')
    .build();

  const swaggerDocument = SwaggerModule.createDocument(app, swaggerConfig);

  SwaggerModule.setup('', app, swaggerDocument);

  await app.listen(process.env.PORT);
}
bootstrap();
