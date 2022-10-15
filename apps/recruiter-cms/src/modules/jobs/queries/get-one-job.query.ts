import { Query } from '@nestjs-architects/typed-cqrs';
import { NotFoundException } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { JobEntity } from '../entities/job.entity';
import { JobRepository } from '../repositories/job.repository';

export class GetOneJobQuery extends Query<JobEntity> {
  constructor(public readonly id: number) {
    super();
  }
}

@QueryHandler(GetOneJobQuery)
export class GetOneJobQueryHandler implements IQueryHandler<GetOneJobQuery> {
  constructor(private readonly jobRepository: JobRepository) {}
  async execute(query: GetOneJobQuery): Promise<JobEntity> {
    const { id } = query;
    const job = await this.jobRepository.findOneBy({ id });
    if (!job) {
      throw new NotFoundException('Job not found');
    }
    return job;
  }
}
