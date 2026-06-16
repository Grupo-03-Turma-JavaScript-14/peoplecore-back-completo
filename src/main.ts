import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.enableCors({
    origin: '*', 
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true, 
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('PeopleCore API')
    .setDescription('Documentação oficial da API PeopleCore')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
 
  // Rota alterada para /swagger
  SwaggerModule.setup('swagger', app, document);

  const port = process.env.PORT || 3000;
  
  await app.listen(port, '0.0.0.0');

  console.log(`🚀 PeopleCore rodando na porta ${port}`);
  console.log(`📄 Documentação disponível em: http://localhost:${port}/swagger`);
}

bootstrap();