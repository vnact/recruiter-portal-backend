import { CustomRepository } from '@decorators/typeorm-ex.decorator';
import { Repository } from 'typeorm';
import { IndustryEntity } from '../entities/industry.entity';

@CustomRepository(IndustryEntity)
export class IndustryRepository extends Repository<IndustryEntity> {}
