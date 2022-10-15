import { CustomRepository } from '@decorators/typeorm-ex.decorator';
import { Repository } from 'typeorm';
import { ExperienceEntity } from '../entities/experience.entity';

@CustomRepository(ExperienceEntity)
export class ExperienceRepository extends Repository<ExperienceEntity> {}
