import { Query } from '@nestjs-architects/typed-cqrs';
import { CompanyEntity } from '../entities/company.entity';
import { NotFoundException } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { CompanyRepository } from '../repositories/company.repository';

export class GetOneCompanyQuery extends Query<CompanyEntity> {
  constructor(public readonly id: number) {
    super();
  }
}

@QueryHandler(GetOneCompanyQuery)
export class GetOneCompanyQueryHandler
  implements IQueryHandler<GetOneCompanyQuery>
{
  constructor(private readonly companyRepository: CompanyRepository) {}
  async execute(query: GetOneCompanyQuery): Promise<CompanyEntity> {
    const { id } = query;
    const company = await this.companyRepository.findOneBy({ id });
    if (!company) {
      throw new NotFoundException('Company not found');
    }
    return company;
  }
}
