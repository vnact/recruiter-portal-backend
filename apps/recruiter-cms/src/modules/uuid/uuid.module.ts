import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CheckUUIDHashCommandHandler } from './commands/check-uuid-hash.command';
import { CreateUUIDCommandHandler } from './commands/create-uuid.command';

@Module({
  imports: [
    HttpModule.registerAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        return {
          baseURL: config.get<string>('UID_SERVICE_HOST'),
        };
      },
    }),
  ],
  providers: [CreateUUIDCommandHandler, CheckUUIDHashCommandHandler],
})
export class UUIDModule {}
