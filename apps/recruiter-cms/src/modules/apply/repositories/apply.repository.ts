import { CustomRepository } from '@decorators/typeorm-ex.decorator';
import { Repository } from 'typeorm';
import { ApplyEntity } from '../entities/apply.entity';

@CustomRepository(ApplyEntity)
export class ApplyRepository extends Repository<ApplyEntity> {}
