import { PaginationDto } from '@common/dto/pagination.dto';
import { Query } from '@nestjs-architects/typed-cqrs';
import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { JobEntity } from '../entities/job.entity';
import { JobRepository } from '../repositories/job.repository';

export class GetAllJobByCompanyQuery extends Query<JobEntity[]> {
  constructor(
    public readonly companyId: number,
    public readonly dto: PaginationDto,
  ) {
    super();
  }
}

@QueryHandler(GetAllJobByCompanyQuery)
export class GetAllJobByCompanyQueryHandler
  implements IQueryHandler<GetAllJobByCompanyQuery>
{
  constructor(private readonly jobRepository: JobRepository) {}

  async execute(query: GetAllJobByCompanyQuery) {
    const { companyId, dto } = query;
    return this.jobRepository.find({
      where: { company: { id: companyId } },
      relations: ['jobSkill', 'recruiter', 'favoriteJob'],
      skip: dto.skip,
      take: dto.take,
      order: dto.toQueryOrder(),
    });
  }
}
