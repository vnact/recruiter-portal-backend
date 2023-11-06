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
      dto: {
        lat,
        lng,
        levels,
        jobTypes,
        range,
        q,
        careers,
        skip,
        take,
        startSalary,
        endSalary,
      },
      dto,
    } = query;

    const boolFilterQuery: esb.Query[] = [];
    const mustQuery = [];

    if (lat && lng && range) {
      const geoDistanceQuery = esb
        .geoDistanceQuery()
        .field('pin.location')
        .distance(`${range}km`)
        .geoPoint(esb.geoPoint().lat(lat).lon(lng));
      boolFilterQuery.push(geoDistanceQuery);
    }

    if (levels && levels.length > 0) {
      const levelQuery = esb
        .boolQuery()
        .should([
          esb.boolQuery().mustNot(esb.existsQuery().field('level')),
          levels.length > 1
            ? esb.termsQuery().field('level.keyword').values(levels)
            : esb.matchQuery('level.keyword', levels[0]),
        ]);
      mustQuery.push(levelQuery);
    }

    if (q) {
      mustQuery.push(
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
          jobTypes.length > 1
            ? esb.termsQuery().field('employmentType.keyword').values(jobTypes)
            : esb.matchQuery('employmentType.keyword', jobTypes[0]),
        ]);
      mustQuery.push(jobTypeQuery);
    }

    if (careers?.length > 0) {
      const careerQuery =
        careers.length > 1
          ? esb.termsQuery().field('career.id').values(careers)
          : esb.matchQuery('career.id', '' + careers[0]);
      mustQuery.push(careerQuery);
    }

    if (startSalary) {
      const salaryQuery = esb.rangeQuery('minSalary').gte(startSalary);
      boolFilterQuery.push(salaryQuery);
    }

    if (endSalary) {
      const salaryQuery = esb.rangeQuery('maxSalary').lte(endSalary);
      boolFilterQuery.push(salaryQuery);
    }

    const boolQuery = esb.boolQuery().filter(boolFilterQuery).must(mustQuery);
    const body = esb
      .requestBodySearch()
      .query(boolQuery)
      .sorts(dto.toSortEntries().map((_sort) => esb.sort(..._sort)))
      .size(take)
      .from(skip);

    const result = await this.queryBus.execute(
      new ElasticsearchSearchQuery('jobs', body),
    );

    return result.map((e) => e._source);
  }
}
