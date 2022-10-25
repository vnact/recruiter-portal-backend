import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmExModule } from '@shared/typeorm-ex.module';
import { JobLikeCommandHandlers } from './commands';
import { JobLikeController } from './controllers/joblike.controller';
import { JobLikeQueryHandlers } from './queries';
import { JobLikeRepository } from './repositories/joblike.repository';

@Module({
  imports: [
    TypeOrmExModule.forCustomRepository([JobLikeRepository]),
    CqrsModule,
  ],
  controllers: [JobLikeController],
  providers: [...JobLikeCommandHandlers, ...JobLikeQueryHandlers],
})
export class JobLikeModule {}
