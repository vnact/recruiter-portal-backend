import { ElasticsearchSearchQueryHandler } from './queries/elasticsearch-search.query';
import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ElasticsearchModule } from '@nestjs/elasticsearch';
import { BulkInsertElasticsearchCommandHandler } from './commands/bulk-insert.command';

@Module({
  imports: [
    ElasticsearchModule.registerAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return {
          node: configService.getOrThrow('ELASTICSEARCH_URL'),
        };
      },
    }),
  ],
  providers: [
    BulkInsertElasticsearchCommandHandler,
    ElasticsearchSearchQueryHandler,
  ],
})
export class ElasticSearchModule {}
