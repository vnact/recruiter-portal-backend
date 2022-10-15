import { Repository } from 'typeorm';
import { CustomRepository } from '@decorators/typeorm-ex.decorator';
import { UserSkillEntity } from '../entities/user-skill.entity';

@CustomRepository(UserSkillEntity)
export class UserSkillRepository extends Repository<UserSkillEntity> {}
