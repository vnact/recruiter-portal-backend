import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { setupSwagger } from './swagger';
import {
  ClassSerializerInterceptor,
  Logger,
  Req,
  ValidationPipe,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as morgan from 'morgan';
async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  app.enableCors({
    origin: '*',
    methods: 'GET,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
  });

  setupSwagger(app);
  const reflector = app.get(Reflector);
  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Content-Type, Accept, Authorization',
    credentials: true,
  });
  morgan.token('body', (req, res) => JSON.stringify(req.body));
  app.use(
    morgan(
      ':method :url :status :response-time ms - :res[content-length] :body - :req[content-length]',
    ),
  );
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );

  app.useGlobalInterceptors(new ClassSerializerInterceptor(reflector));
  const configService = app.get(ConfigService);

  const port = configService.get<number>('SERVICE_PORT');
  const hostname = configService.get<string>('SERVICE_HOST');

  await app.listen(port, hostname);

  Logger.log(`🚀 App listening in port ${hostname}:${port}`);
}
bootstrap();
