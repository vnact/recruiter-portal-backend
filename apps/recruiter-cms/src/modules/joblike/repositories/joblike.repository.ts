import { CustomRepository } from '@decorators/typeorm-ex.decorator';
import { Repository } from 'typeorm';
import { JobLikeEntity } from '../entities/joblike.entity';

@CustomRepository(JobLikeEntity)
export class JobLikeRepository extends Repository<JobLikeEntity> {}
