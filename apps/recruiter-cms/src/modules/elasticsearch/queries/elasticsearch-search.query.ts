import { Query } from '@nestjs-architects/typed-cqrs';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { ElasticsearchService } from '@nestjs/elasticsearch';
import { RequestBodySearch } from 'elastic-builder';

export class ElasticsearchSearchQuery extends Query<any> {
  constructor(
    public readonly index: string,
    public readonly body: RequestBodySearch,
  ) {
    super();
  }
}

@QueryHandler(ElasticsearchSearchQuery)
export class ElasticsearchSearchQueryHandler
  implements IQueryHandler<ElasticsearchSearchQuery>
{
  constructor(private readonly elasticsearchService: ElasticsearchService) {}
  async execute(query: ElasticsearchSearchQuery): Promise<any> {
    const { index, body } = query;
    const {
      body: {
        hits: { hits },
      },
    } = await this.elasticsearchService.search({
      index,
      body: body.toJSON(),
    });

    return hits;
  }
}
