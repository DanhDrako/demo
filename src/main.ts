import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser());
  const config = new DocumentBuilder()
    .setTitle('Demo CRUD')
    .setDescription('The description')
    .setVersion('1.0')
    //.addBasicAuth()
    .addBearerAuth
    // { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' },
    // 'access-token',
    ()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();
