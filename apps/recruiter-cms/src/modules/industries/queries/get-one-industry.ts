import { IndustryEntity } from '@modules/companies/entities/industry.entity';
import { IndustryRepository } from '@modules/companies/repositories/industry.repository';
import {
  IQueryHandler,
  Query,
  QueryHandler,
} from '@nestjs-architects/typed-cqrs';
import { NotFoundException } from '@nestjs/common';

export class GetOneIndustryQuery extends Query<IndustryEntity> {
  constructor(public readonly id: number) {
    super();
  }
}

@QueryHandler(GetOneIndustryQuery)
export class GetOneIndustryQueryHandler
  implements IQueryHandler<GetOneIndustryQuery>
{
  constructor(private readonly industryRepository: IndustryRepository) {}
  async execute(query: GetOneIndustryQuery): Promise<IndustryEntity> {
    const { id } = query;
    const industry = this.industryRepository.findOneBy({ id });
    if (!industry) throw new NotFoundException('Industry not found');
    return industry;
  }
}
