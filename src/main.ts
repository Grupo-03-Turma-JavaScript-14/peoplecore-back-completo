import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { TransformInterceptor } from './common/interceptors/transform.interceptor';
import basicAuth from 'express-basic-auth';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // ✅ CORREÇÃO: Usar process.cwd() para garantir o caminho absoluto
  const uploadsPath = join(process.cwd(), 'uploads');
  console.log('📁 Servindo arquivos estáticos de:', uploadsPath);
  
  app.useStaticAssets(uploadsPath, { prefix: '/uploads/' });

  // Resto do código...
  app.useGlobalPipes(new ValidationPipe({
    whitelist: false,
    transform: true,
    forbidNonWhitelisted: false,
  }));

  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalInterceptors(new TransformInterceptor());

  app.enableCors({
    origin: ['http://localhost:5173', 'http://localhost:3000'],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  });

  app.use(
    ['/swagger', '/swagger-json'],
    basicAuth({
      challenge: true,
      users: { 'admin': 'K@m1l@12' },
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('PeopleCore ERP')
    .setDescription('API do sistema ERP de RH com autenticação JWT')
    .setVersion('2.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document);

  await app.listen(process.env.PORT ?? 3000, '0.0.0.0');
  console.log(`🚀 PeopleCore rodando em: http://localhost:${process.env.PORT ?? 3000}`);
  console.log(`📚 Swagger em: http://localhost:${process.env.PORT ?? 3000}/swagger`);
  console.log(`📁 Uploads disponíveis em: http://localhost:${process.env.PORT ?? 3000}/uploads/`);
}

bootstrap();