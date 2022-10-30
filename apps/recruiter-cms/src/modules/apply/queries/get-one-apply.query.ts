import { GetOneJobQuery } from '@modules/jobs/queries/get-one-job.query';
import { Query } from '@nestjs-architects/typed-cqrs';
import { QueryHandler, IQueryHandler, QueryBus } from '@nestjs/cqrs';
import { ApplyEntity } from '../entities/apply.entity';
import { ApplyRepository } from '../repositories/apply.repository';

export class GetOneApplyQuery extends Query<ApplyEntity> {
  constructor(public readonly userId: number, public readonly jobId: number) {
    super();
  }
}

@QueryHandler(GetOneApplyQuery)
export class GetOneApplyQueryHandler
  implements IQueryHandler<GetOneApplyQuery>
{
  constructor(
    private readonly applyRepository: ApplyRepository,
    private readonly queryBus: QueryBus,
  ) {}

  async execute(query: GetOneApplyQuery) {
    const { userId, jobId } = query;
    const job = await this.queryBus.execute(new GetOneJobQuery(jobId));
    return await this.applyRepository.findOne({
      where: { userId, jobID: job.id },
      relations: ['job', 'user'],
    });
  }
}
