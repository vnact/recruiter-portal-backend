import { Module } from '@nestjs/common';
import { FrontendController } from './frontend.controller';
import { CqrsModule } from '@nestjs/cqrs';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { frontendQueryHandlers } from './queries';

@Module({
  controllers: [FrontendController],
  imports: [
    CqrsModule,
    HttpModule.registerAsync({
      inject: [ConfigService],
      useFactory: (configService) => {
        return {
          baseURL: 'https://maps.googleapis.com/maps/api/',
          params: {
            key: configService.get('GOOGLEMAP_API_KEY'),
            language: 'vi',
          },
        };
      },
      imports: [ConfigModule],
    }),
  ],
  providers: [...frontendQueryHandlers],
})
export class FrontendModule {}
