import { CustomRepository } from '@decorators/typeorm-ex.decorator';
import { Repository } from 'typeorm';
import { SkillEntity } from '../entities/skill.entity';

@CustomRepository(SkillEntity)
export class SkillRepository extends Repository<SkillEntity> {}
