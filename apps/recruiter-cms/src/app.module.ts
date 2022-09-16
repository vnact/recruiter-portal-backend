import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { FrontendModule } from './frontend/frontend.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      ignoreEnvFile: process.env.NODE_ENV === 'production',
    }),
    FrontendModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
