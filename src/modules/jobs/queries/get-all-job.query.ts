import { PaginationDto } from '@common/dto/pagination.dto';
import { ElasticsearchSearchQuery } from '@modules/elasticsearch/queries/elasticsearch-search.query';
import { Query } from '@nestjs-architects/typed-cqrs';
import { IQueryHandler, QueryBus, QueryHandler } from '@nestjs/cqrs';
import * as esb from 'elastic-builder';
import { JobEntity } from '../entities/job.entity';
import { JobRepository } from '../repositories/job.repository';

export class GetAllJobQuery extends Query<JobEntity> {
  constructor(public readonly dto: PaginationDto) {
    super();
  }
}

@QueryHandler(GetAllJobQuery)
export class GetAllJobQueryHandler implements IQueryHandler<GetAllJobQuery> {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly jobRepository: JobRepository,
  ) {}
  async execute(query: GetAllJobQuery): Promise<any> {
    const { dto } = query;
    // const body = esb
    //   .requestBodySearch()
    //   .query(esb.matchAllQuery())
    //   .sorts(
    //     Object.keys(dto.toQueryOrder<JobEntity>()).map((key) => {
    //       return esb.sort(key, dto.toQueryOrder<JobEntity>()[key]);
    //     }),
    //   )
    //   .size(dto.take)
    //   .from(dto.skip);

    // const result = await this.queryBus.execute(
    //   new ElasticsearchSearchQuery('jobs', body),
    // );

    // return result.map((e) => e._source);

    return this.jobRepository.find({
      skip: dto.skip,
      take: dto.take,
      order: dto.toQueryOrder(),
    });
  }
}
