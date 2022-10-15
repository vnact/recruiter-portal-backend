import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmExModule } from '@shared/typeorm-ex.module';
import { UserCommandHandlers } from './commands';
import { UserSkillController } from './controllers/user-skill.controller';
import { UserQueryHandlers } from './queries';
import { UserSkillRepository } from './repositories/user-skill.repository';
import { UserRepository } from './repositories/user.repository';

@Module({
  providers: [...UserCommandHandlers, ...UserQueryHandlers],
  imports: [
    TypeOrmExModule.forCustomRepository([UserRepository, UserSkillRepository]),
    CqrsModule,
  ],
  controllers: [UserSkillController],
})
export class UserModule {}
