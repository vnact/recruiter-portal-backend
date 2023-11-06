import { CustomRepository } from '@decorators/typeorm-ex.decorator';
import { Repository } from 'typeorm';
import { EducationEntity } from '../entities/education.entity';

@CustomRepository(EducationEntity)
export class EducationRepository extends Repository<EducationEntity> {}
