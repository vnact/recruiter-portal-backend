import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { setupSwagger } from './swagger';
import {
  ClassSerializerInterceptor,
  Logger,
  ValidationPipe,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  setupSwagger(app);
  const reflector = app.get(Reflector);

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );

  app.useGlobalInterceptors(new ClassSerializerInterceptor(reflector));

  const configService = app.get(ConfigService);

  const port = configService.get<number>('SERVICE_PORT');
  await app.listen(port);

  Logger.log(`🚀 App listening in port ${port}`);
}
bootstrap();
