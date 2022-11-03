import { PaginationDto } from '@common/dto/pagination.dto';
import { Query } from '@nestjs-architects/typed-cqrs';
import { IQueryHandler, QueryBus, QueryHandler } from '@nestjs/cqrs';
import { JobEntity } from '../entities/job.entity';
import * as esb from 'elastic-builder';
import { ElasticsearchSearchQuery } from '@modules/elasticsearch/queries/elasticsearch-search.query';
import { GetOneUserQuery } from '@modules/users/queries/get-one-user.query';

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
    const user = await this.queryBus.execute(new GetOneUserQuery(id));

    if (!user) return [];

    const shouldQuery = [];
    const { careers, skills } = user;
    if (careers.length > 1) {
      shouldQuery.push(
        esb
          .termsQuery()
          .field('career.id')
          .values(careers.map((career) => career.id)),
      );
    } else if (careers.length == 1) {
      shouldQuery.push(esb.matchQuery('career.id', '' + careers[0].id));
    }

    if (skills.length > 1) {
      shouldQuery.push(
        esb
          .termsQuery()
          .field('jobSkill.skill.id')
          .values(skills.map((skill) => skill.skillId)),
      );
    } else if (skills.length == 1) {
      shouldQuery.push(
        esb.matchQuery('jobSkill.skill.id', '' + skills[0].skillId),
      );
    }
    const body = esb
      .requestBodySearch()
      .query(esb.boolQuery().should(shouldQuery))
      .sorts(dto.toSortEntries().map((_sort) => esb.sort(..._sort)))
      .size(dto.take)
      .from(dto.skip);

    const result = await this.queryBus.execute(
      new ElasticsearchSearchQuery('jobs', body),
    );

    return result.map((e) => e._source);
  }
}
