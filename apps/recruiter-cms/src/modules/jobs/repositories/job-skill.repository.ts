import { CustomRepository } from '@decorators/typeorm-ex.decorator';
import { Repository } from 'typeorm';
import { JobSkillEntity } from '../entities/job-skill.entity';

@CustomRepository(JobSkillEntity)
export class JobSkillRepository extends Repository<JobSkillEntity> {}
