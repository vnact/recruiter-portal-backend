import { JobEntity } from '@modules/jobs/entities/job.entity';
import { Injectable, Logger } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { Cron, CronExpression } from '@nestjs/schedule';
import { GetCurrentUpdatedQuery } from '../queries/get-current-updated.service';

@Injectable()
export class GetCurrentUpdatedService {
  private readonly logger = new Logger(GetCurrentUpdatedService.name);
  constructor(private readonly queryBus: QueryBus) {}

  @Cron(CronExpression.EVERY_SECOND)
  handleCron() {
    this.queryBus
      .execute(
        new GetCurrentUpdatedQuery(JobEntity, ['recruiter', 'company', '']),
      )
      .then(console.log);
  }
}
