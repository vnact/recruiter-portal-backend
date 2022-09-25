import { Module } from '@nestjs/common';
import { TypeOrmExModule } from '@shared/typeorm-ex.module';
import { UserCommandHandlers } from './commands';
import { UserQueryHandlers } from './queries';
import { UserRepository } from './repositories/user.repository';

@Module({
  providers: [...UserCommandHandlers, ...UserQueryHandlers],
  imports: [TypeOrmExModule.forCustomRepository([UserRepository])],
})
export class UserModule {}
