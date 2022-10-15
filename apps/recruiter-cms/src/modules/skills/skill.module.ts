import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmExModule } from '@shared/typeorm-ex.module';
import { SkillCommandHandlers } from './commands';
import { SkillController } from './controllers/skill.controller';
import { SkillQueryHandles } from './queries';
import { SkillRepository } from './repositories/skill.repository';

@Module({
  imports: [TypeOrmExModule.forCustomRepository([SkillRepository]), CqrsModule],
  controllers: [SkillController],
  providers: [...SkillQueryHandles, ...SkillCommandHandlers],
})
export class SkillModule {}
