import { IndustryEntity } from '@modules/companies/entities/industry.entity';
import { IndustryRepository } from '@modules/companies/repositories/industry.repository';
import {
  IQueryHandler,
  Query,
  QueryHandler,
} from '@nestjs-architects/typed-cqrs';

export class GetAllIndustryQuery extends Query<IndustryEntity[]> {
  constructor() {
    super();
  }
}

@QueryHandler(GetAllIndustryQuery)
export class GetAllIndustryQueryHandler
  implements IQueryHandler<GetAllIndustryQuery>
{
  constructor(private readonly industryRepository: IndustryRepository) {}
  async execute(): Promise<IndustryEntity[]> {
    return this.industryRepository.find();
  }
}
