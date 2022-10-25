import { Query } from '@nestjs-architects/typed-cqrs';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { JobLikeEntity } from '../entities/joblike.entity';
import { JobLikeRepository } from '../repositories/joblike.repository';

export class GetOneJobLikeQuery extends Query<JobLikeEntity> {
  constructor(public readonly userId: number, public readonly jobId: number) {
    super();
  }
}

@QueryHandler(GetOneJobLikeQuery)
export class GetOneJobLikeQueryHandler
  implements IQueryHandler<GetOneJobLikeQuery>
{
  constructor(private readonly joblikeRepository: JobLikeRepository) {}
  execute(query: GetOneJobLikeQuery): Promise<JobLikeEntity> {
    return this.joblikeRepository.findOne({
      where: {
        userId: query.userId,
        jobId: query.jobId,
      },
    });
  }
}
