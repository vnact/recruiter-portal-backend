import { Command } from '@nestjs-architects/typed-cqrs';
import { ICommandHandler, CommandHandler } from '@nestjs/cqrs';
import { ElasticsearchService } from '@nestjs/elasticsearch';

export class BulkInsertElasticsearchCommand<T> extends Command<any> {
  constructor(public readonly docs: T[], public readonly index: string) {
    super();
  }
}

@CommandHandler(BulkInsertElasticsearchCommand)
export class BulkInsertElasticsearchCommandHandler<T>
  implements ICommandHandler<BulkInsertElasticsearchCommand<T>>
{
  constructor(public readonly elasticsearchService: ElasticsearchService) {}
  async execute(command: BulkInsertElasticsearchCommand<T>): Promise<any> {
    const body = command.docs.flatMap((doc: any) => [
      {
        index: {
          _index: command.index,
          _id: doc.id,
          _type: '_doc',
        },
      },
      doc,
    ]);
    return this.elasticsearchService.bulk({
      body,
    });
  }
}
