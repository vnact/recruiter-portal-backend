import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmExModule } from '@shared/typeorm-ex.module';
import { JobController } from './controllers/job.controller';
import { JobQueryHandlers } from './queries';
import { JobRepository } from './repositories/job.repository';

@Module({
  controllers: [JobController],
  providers: [...JobQueryHandlers],
  imports: [CqrsModule, TypeOrmExModule.forCustomRepository([JobRepository])],
})
export class JobModule {}
