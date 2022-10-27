import { Query } from '@nestjs-architects/typed-cqrs';
import { IQueryHandler, QueryHandler, QueryBus } from '@nestjs/cqrs';
import { SearchJobDto } from '../dto/search-job.dto';
import * as esb from 'elastic-builder';
import { ElasticsearchSearchQuery } from '@modules/elasticsearch/queries/elasticsearch-search.query';

export class SearchJobQuery extends Query<any> {
  constructor(public readonly dto: SearchJobDto) {
    super();
  }
}

@QueryHandler(SearchJobQuery)
export class SearchJobQueryHandler implements IQueryHandler<SearchJobQuery> {
  constructor(private readonly queryBus: QueryBus) {}
  async execute(query: SearchJobQuery) {
    const {
      dto: { lat, lng, levels, jobTypes, rangeMeter, q },
    } = query;

    const geoDistanceQuery = esb
      .geoDistanceQuery()
      .field('pin.location')
      .distance(`${rangeMeter}m`)
      .geoPoint(esb.geoPoint().lat(lat).lon(lng));

    const boolFilterQuery = [geoDistanceQuery];
    const mustFilterQuery = [];

    if (levels && levels.length > 0) {
      const levelQuery = esb
        .boolQuery()
        .should([
          esb.boolQuery().mustNot(esb.existsQuery().field('level')),
          esb.termsQuery().field('level.keyword').values(levels),
        ]);
      mustFilterQuery.push(levelQuery);
    }

    if (q) {
      mustFilterQuery.push(
        esb
          .multiMatchQuery()
          .fields(['title', 'company.name', 'description'])
          .query(q)
          .type('phrase_prefix'),
      );
    }

    if (jobTypes && jobTypes.length > 0) {
      const jobTypeQuery = esb
        .boolQuery()
        .should([
          esb.boolQuery().mustNot(esb.existsQuery().field('employmentType')),
          esb.termsQuery().field('employmentType.keyword').values(levels),
        ]);
      mustFilterQuery.push(jobTypeQuery);
    }

    const boolQuery = esb
      .boolQuery()
      .filter(boolFilterQuery)
      .must(mustFilterQuery);
    const body = esb
      .requestBodySearch()
      .query(boolQuery)
      .sort(esb.sort('_score', 'DESC'));

    const result = await this.queryBus.execute(
      new ElasticsearchSearchQuery('jobs', body),
    );

    return result.map((e) => e._source);
  }
}
