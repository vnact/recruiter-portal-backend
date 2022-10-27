import { JobEntity } from '@modules/jobs/entities/job.entity';
import { Injectable, Logger } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { Cron, CronExpression } from '@nestjs/schedule';
import * as moment from 'moment';
import { SyncElasticSearchCommand } from '../commands/sync-elasticsearch.command';
import { GetCurrentUpdatedQuery } from '../queries/get-current-updated.service';

@Injectable()
export class GetCurrentUpdatedService {
  private readonly logger = new Logger(GetCurrentUpdatedService.name);
  constructor(
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus,
  ) {}

  @Cron(CronExpression.EVERY_5_MINUTES)
  async handleCron() {
    const jobs = await this.queryBus.execute(
      new GetCurrentUpdatedQuery(
        JobEntity,
        moment().subtract(5, 'minutes').toDate(),
      ),
    );

    if (jobs.length > 0) {
      await this.commandBus.execute(new SyncElasticSearchCommand(jobs, 'jobs'));
    }
  }
}
