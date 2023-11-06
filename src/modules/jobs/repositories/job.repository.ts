import { CustomRepository } from '@decorators/typeorm-ex.decorator';
import { Repository } from 'typeorm';
import { JobEntity } from '../entities/job.entity';

@CustomRepository(JobEntity)
export class JobRepository extends Repository<JobEntity> {}
