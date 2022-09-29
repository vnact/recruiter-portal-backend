import { Query } from '@nestjs-architects/typed-cqrs';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { SearchJobDto } from '../dto/search-job.dto';
import { JobRepository } from '../repositories/job.repository';

export class SearchJobQuery extends Query<any> {
  constructor(public readonly dto: SearchJobDto) {
    super();
  }
}

@QueryHandler(SearchJobQuery)
export class SearchJobQueryHandler implements IQueryHandler<SearchJobQuery> {
  constructor(private readonly jobRepository: JobRepository) {}
  execute(query: SearchJobQuery): Promise<any> {
    const { dto } = query;
    const builder = this.jobRepository.createQueryBuilder('j');

    return builder.getMany();
  }
}
