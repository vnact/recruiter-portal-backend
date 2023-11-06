import { CustomRepository } from '@decorators/typeorm-ex.decorator';
import { Repository } from 'typeorm';
import { CompanyEntity } from '../entities/company.entity';

@CustomRepository(CompanyEntity)
export class CompanyRepository extends Repository<CompanyEntity> {}
