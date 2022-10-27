import { JobEntity } from '@modules/jobs/entities/job.entity';
import { Command } from '@nestjs-architects/typed-cqrs';
import {
  ICommandHandler,
  CommandHandler,
  QueryBus,
  CommandBus,
} from '@nestjs/cqrs';
import { GetCurrentUpdatedQuery } from '../queries/get-current-updated.service';
import { SyncElasticSearchCommand } from './sync-elasticsearch.command';

export class SyncDataCommand extends Command<void> {
  constructor() {
    super();
  }
}

@CommandHandler(SyncDataCommand)
export class SyncDataCommandHandler
  implements ICommandHandler<SyncDataCommand>
{
  constructor(
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus,
  ) {}
  async execute(command: SyncDataCommand): Promise<any> {
    const jobs = await this.queryBus.execute(
      new GetCurrentUpdatedQuery(JobEntity),
    );

    if (jobs.length > 0) {
      await this.commandBus.execute(new SyncElasticSearchCommand(jobs, 'jobs'));
    }
  }
}
