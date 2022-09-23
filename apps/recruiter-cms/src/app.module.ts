import { AuthModule } from '@modules/auth/auth.module';
import { UUIDModule } from '@modules/uuid/uuid.module';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ormConfig } from './configs/orm.config';
import { FrontendModule } from './modules/frontend/frontend.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      ignoreEnvFile: process.env.NODE_ENV === 'production',
      load: [ormConfig],
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => config.get('database'),
    }),
    UUIDModule,
    FrontendModule,
    AuthModule,
  ],
})
export class AppModule {}
