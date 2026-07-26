import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import session from 'express-session';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const secret = configService.get<string>('JWT_SECRET');
  const port = configService.get<number>('PORT', 4000);

  app.use(session({
    secret: secret,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 3600000,
      secure: true,
      httpOnly: true
    }
  }));

  app.enableCors({
    origin: 'https://localhost:3000', // FE url
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  app.useGlobalPipes(new ValidationPipe());

  await app.listen(port);
}
bootstrap();
