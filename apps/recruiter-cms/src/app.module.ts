import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { FrontendModule } from './modules/frontend/frontend.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      ignoreEnvFile: process.env.NODE_ENV === 'production',
    }),
    FrontendModule,
  ],
})
export class AppModule {}
