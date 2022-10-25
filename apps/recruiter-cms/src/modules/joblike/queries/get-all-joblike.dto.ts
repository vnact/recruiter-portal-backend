import { Query } from '@nestjs-architects/typed-cqrs';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { JobLikeEntity } from '../entities/joblike.entity';
import { JobLikeRepository } from '../repositories/joblike.repository';

export class GetAllJobLikeQuery extends Query<JobLikeEntity> {
  constructor(public readonly userId: number) {
    super();
  }
}

@QueryHandler(GetAllJobLikeQuery)
export class GetAllJobLikeQueryHandler
  implements IQueryHandler<GetAllJobLikeQuery>
{
  constructor(private readonly joblikeRepository: JobLikeRepository) {}
  execute(query: GetAllJobLikeQuery): Promise<JobLikeEntity[]> {
    const { userId } = query;
    return this.joblikeRepository.find({ where: { userId } });
  }
}
