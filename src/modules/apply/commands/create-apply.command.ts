import { GetOneApplyQuery } from '../queries/get-one-apply.query';
import { Command } from '@nestjs-architects/typed-cqrs';
import { CommandHandler, ICommandHandler, QueryBus } from '@nestjs/cqrs';
import { ApplyEntity } from '../entities/apply.entity';
import { ApplyRepository } from '../repositories/apply.repository';
import { BadRequestException } from '@nestjs/common';
import { GetOneJobQuery } from '@modules/jobs/queries/get-one-job.query';
import { GetOneUserQuery } from '@modules/users/queries/get-one-user.query';
import { JobRepository } from '@modules/jobs/repositories/job.repository';

export class CreateApplyCommand extends Command<ApplyEntity> {
  constructor(public readonly jobID: number, public readonly userId: number) {
    super();
  }
}

@CommandHandler(CreateApplyCommand)
export class CreateApplyCommandHandler
  implements ICommandHandler<CreateApplyCommand>
{
  constructor(
    private readonly applyRepository: ApplyRepository,
    private readonly jobRepository: JobRepository,
    private readonly queryBus: QueryBus,
  ) {}

  async execute(command: CreateApplyCommand) {
    const { jobID, userId } = command;
    const apply = await this.queryBus.execute(
      new GetOneApplyQuery(userId, jobID),
    );
    const job = await this.queryBus.execute(new GetOneJobQuery(jobID));
    const user = await this.queryBus.execute(new GetOneUserQuery(userId));

    await this.jobRepository.update(
      {
        id: jobID,
      },
      {
        applies: () => `applies ${apply ? '-' : '+'} 1`,
      },
    );

    if (apply) {
      await this.applyRepository.remove(apply);
      return apply;
    }

    const newApply = this.applyRepository.create({ job, user });

    return this.applyRepository.save(newApply);
  }
}
