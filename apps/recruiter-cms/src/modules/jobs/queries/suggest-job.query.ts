import { PaginationDto } from '@common/dto/pagination.dto';
import { GetAllSkillUser } from '@modules/users/queries/get-all-skill-of-user.query';
import { Query } from '@nestjs-architects/typed-cqrs';
import { IQueryHandler, QueryBus, QueryHandler } from '@nestjs/cqrs';
import { JobEntity } from '../entities/job.entity';
import * as esb from 'elastic-builder';
import { ElasticsearchSearchQuery } from '@modules/elasticsearch/queries/elasticsearch-search.query';

export class SuggestJobQuery extends Query<JobEntity[]> {
  constructor(public readonly id: number, public readonly dto: PaginationDto) {
    super();
  }
}

@QueryHandler(SuggestJobQuery)
export class SuggestJobQueryHandler implements IQueryHandler<SuggestJobQuery> {
  constructor(private readonly queryBus: QueryBus) {}
  async execute(query: SuggestJobQuery): Promise<JobEntity[]> {
    const { id, dto } = query;
    const userSkills = await this.queryBus.execute(new GetAllSkillUser(id));
    console.log(Object.values(dto.toQueryOrder<JobEntity>()));

    const body = esb
      .requestBodySearch()
      .query(
        esb
          .termsQuery()
          .field('jobSkill.skill.id')
          .values(userSkills.map((skill) => skill.skill.id)),
      )
      .sorts(
        Object.keys(dto.toQueryOrder<JobEntity>()).map((key) => {
          return esb.sort(key, dto.toQueryOrder<JobEntity>()[key]);
        }),
      )
      .size(dto.take)
      .from(dto.skip);
    const result = await this.queryBus.execute(
      new ElasticsearchSearchQuery('jobs', body),
    );

    return result.map((e) => e._source);
  }
}
