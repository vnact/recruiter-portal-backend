import { Module } from '@nestjs/common';
import { FrontendController } from './frontend.controller';
import { CqrsModule } from '@nestjs/cqrs';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import { frontendQueryHandlers } from './queries';

@Module({
  controllers: [FrontendController],
  imports: [
    CqrsModule,
    HttpModule.register({
      baseURL: 'https://maps.googleapis.com/maps/api/',
    }),
    ConfigModule,
  ],
  providers: [...frontendQueryHandlers],
})
export class FrontendModule {}
