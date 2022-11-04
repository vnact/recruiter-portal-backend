import { PaginationDto } from '@common/dto/pagination.dto';
import { Query, IQueryHandler } from '@nestjs-architects/typed-cqrs';
import { QueryHandler } from '@nestjs/cqrs';
/* eslint-disable prettier/prettier */
import { CompanyEntity } from '../entities/company.entity';
import { CompanyRepository } from '../repositories/company.repository';

export class GetAllCompanyQuery extends Query<CompanyEntity[]> {
  constructor(public readonly dto: PaginationDto) {
    super();
  }
}

@QueryHandler(GetAllCompanyQuery)
export class GetAllCompanyQueryHandler
  implements IQueryHandler<GetAllCompanyQuery>
{
  constructor(private readonly companyRepository: CompanyRepository) {}

  async execute(query: GetAllCompanyQuery) {
    const { dto } = query;
    return this.companyRepository.find({
      skip: dto.skip,
      take: dto.take,
      order: dto.toQueryOrder(),
    });
  }
}
