import { Module } from '@nestjs/common';
import { JobController } from './controllers/job.controller';

@Module({
  controllers: [JobController],
})
export class JobModule {}
