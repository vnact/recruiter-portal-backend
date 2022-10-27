import { BaseEntity } from '@common/base.entity';
import { BulkInsertElasticsearchCommand } from '@modules/elasticsearch/commands/bulk-insert.command';
import { Command } from '@nestjs-architects/typed-cqrs';
import { ICommandHandler, CommandHandler, CommandBus } from '@nestjs/cqrs';

export class SyncElasticSearchCommand<
  T extends BaseEntity,
> extends Command<void> {
  constructor(public readonly docs: T[], public readonly index: string) {
    super();
  }
}

@CommandHandler(SyncElasticSearchCommand)
export class SyncElasticSearchCommandHandler<T extends BaseEntity>
  implements ICommandHandler<SyncElasticSearchCommand<T>>
{
  constructor(public readonly commandBus: CommandBus) {}
  async execute(command: SyncElasticSearchCommand<T>): Promise<any> {
    const docs = command.docs.map((doc) => doc.elasticsearchBody);
    const { body } = await this.commandBus.execute(
      new BulkInsertElasticsearchCommand(docs, command.index),
    );

    for (const item of body.items) {
      if (item?.index?.status !== 200) console.log(item?.index?.error);
    }
  }
}
