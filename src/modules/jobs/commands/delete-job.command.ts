import { Command } from '@nestjs-architects/typed-cqrs';
import { ForbiddenException } from '@nestjs/common';
import {
  CommandHandler,
  ICommandHandler,
  QueryBus,
  CommandBus,
} from '@nestjs/cqrs';
import { JobEntity } from '../entities/job.entity';
import { GetOneJobQuery } from '../queries/get-one-job.query';
import { JobRepository } from '../repositories/job.repository';
import { DeleteJobSkillCommand } from './delete-job-skill.command';

export class DeleteJobCommand extends Command<JobEntity> {
  constructor(public readonly id: number, public readonly userId: number) {
    super();
  }
}

@CommandHandler(DeleteJobCommand)
export class DeleteJobCommandHandler
  implements ICommandHandler<DeleteJobCommand>
{
  constructor(
    private readonly queryBus: QueryBus,
    public readonly commandBus: CommandBus,
    private readonly jobRepository: JobRepository,
  ) {}
  async execute(command: DeleteJobCommand): Promise<any> {
    const { id, userId } = command;
    const job = await this.queryBus.execute(new GetOneJobQuery(id));
    if (job.recruiter.id !== userId) {
      throw new ForbiddenException('You are not authorized to update this job');
    }

    await this.commandBus.execute(new DeleteJobSkillCommand(job.id));
    return this.jobRepository.remove(job);
  }
}
