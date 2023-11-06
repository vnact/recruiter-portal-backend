import { Query } from '@nestjs-architects/typed-cqrs';
import { ApplyEntity } from '../entities/apply.entity';
import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { ApplyRepository } from '../repositories/apply.repository';

export class GetAllJobApplyByUserQuery extends Query<ApplyEntity[]> {
  constructor(public readonly userId: number) {
    super();
  }
}

@QueryHandler(GetAllJobApplyByUserQuery)
export class GetAllJobApplyByUserQueryHandler
  implements IQueryHandler<GetAllJobApplyByUserQuery>
{
  constructor(private readonly applyRepository: ApplyRepository) {}

  async execute(query: GetAllJobApplyByUserQuery) {
    const { userId } = query;
    const jobsApply = await this.applyRepository.find({
      relations: ['job'],
      where: { userId },
    });
    return jobsApply;
  }
}
