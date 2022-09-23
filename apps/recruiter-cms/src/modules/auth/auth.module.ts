import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { AuthCommandHandlers } from './commands';
import { AuthController } from './controllers/auth.controller';
import { LocalStrategy } from './local.strategy';

@Module({
  controllers: [AuthController],
  imports: [CqrsModule],
  providers: [LocalStrategy, ...AuthCommandHandlers],
})
export class AuthModule {}
