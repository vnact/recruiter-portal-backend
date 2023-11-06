import { Command } from '@nestjs-architects/typed-cqrs';
import { ForbiddenException } from '@nestjs/common';
import { CommandHandler, ICommandHandler, QueryBus } from '@nestjs/cqrs';
import { UpdateJobDto } from '../dto/update-job.dto';
import { JobEntity } from '../entities/job.entity';
import { GetOneJobQuery } from '../queries/get-one-job.query';
import { JobRepository } from '../repositories/job.repository';

export class UpdateJobCommand extends Command<JobEntity> {
  constructor(
    public readonly id: number,
    public readonly userId: number,
    public readonly dto: UpdateJobDto,
  ) {
    super();
  }
}

@CommandHandler(UpdateJobCommand)
export class UpdateJobCommandHandler
  implements ICommandHandler<UpdateJobCommand>
{
  constructor(
    private readonly jobRepository: JobRepository,
    private readonly queryBus: QueryBus,
  ) {}

  async execute(command: UpdateJobCommand): Promise<JobEntity> {
    const { id, dto, userId } = command;
    const job = await this.queryBus.execute(new GetOneJobQuery(id));
    if (job.recruiter.id !== userId) {
      throw new ForbiddenException('You are not authorized to update this job');
    }
    return this.jobRepository.save({ ...job, ...dto });
  }
}
