import { CustomRepository } from '@decorators/typeorm-ex.decorator';
import { Repository } from 'typeorm';
import { CareerEntity } from '../entities/career.entity';

@CustomRepository(CareerEntity)
export class CareerRepository extends Repository<CareerEntity> {}
