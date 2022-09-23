import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { AuthCommandHandlers } from './commands';
import { AuthController } from './controllers/auth.controller';

@Module({
  controllers: [AuthController],
  imports: [CqrsModule],
  providers: [...AuthCommandHandlers],
})
export class AuthModule {}
