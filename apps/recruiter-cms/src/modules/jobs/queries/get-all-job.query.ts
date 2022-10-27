import { Query } from '@nestjs-architects/typed-cqrs';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { JobEntity } from '../entities/job.entity';
import { JobRepository } from '../repositories/job.repository';

export class GetAllJobQuery extends Query<JobEntity> {
  constructor() {
    super();
  }
}

@QueryHandler(GetAllJobQuery)
export class GetAllJobQueryHandler implements IQueryHandler<GetAllJobQuery> {
  constructor(private readonly jobRepository: JobRepository) {}
  async execute(query: GetAllJobQuery): Promise<any> {
    const builder = this.jobRepository.createQueryBuilder('j');
  }
}
