import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmExModule } from '@shared/typeorm-ex.module';
import { JobCommandHandlers } from './commands';
import { JobSkillController } from './controllers/job-skill.controller';
import { JobController } from './controllers/job.controller';
import { JobQueryHandlers } from './queries';
import { JobSkillRepository } from './repositories/job-skill.repository';
import { JobRepository } from './repositories/job.repository';

@Module({
  controllers: [JobController, JobSkillController],
  providers: [...JobQueryHandlers, ...JobCommandHandlers],
  imports: [
    CqrsModule,
    TypeOrmExModule.forCustomRepository([JobRepository, JobSkillRepository]),
  ],
})
export class JobModule {}
