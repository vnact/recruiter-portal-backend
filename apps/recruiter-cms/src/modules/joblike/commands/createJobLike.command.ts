import { GetOneJobQuery } from '@modules/jobs/queries/get-one-job.query';
import { GetOneUserQuery } from '@modules/users/queries/get-one-user.query';
import { Command } from '@nestjs-architects/typed-cqrs';
import { CommandHandler, ICommandHandler, QueryBus } from '@nestjs/cqrs';
import { JobLikeEntity } from '../entities/joblike.entity';
import { GetOneJobLikeQuery } from '../queries/get-one-jobLike.query';
import { JobLikeRepository } from '../repositories/joblike.repository';

export class CreateJobLikeCommand extends Command<JobLikeEntity> {
  constructor(public readonly jobID: number, public readonly userID: number) {
    super();
  }
}

@CommandHandler(CreateJobLikeCommand)
export class CreateJobLikeCommandHandler
  implements ICommandHandler<CreateJobLikeCommand>
{
  constructor(
    private readonly jobLikeRepository: JobLikeRepository,
    private readonly queryBus: QueryBus,
  ) {}
  async execute(command: CreateJobLikeCommand): Promise<JobLikeEntity> {
    const { jobID, userID } = command;
    const jobLike = await this.queryBus.execute(
      new GetOneJobLikeQuery(userID, jobID),
    );
    if (jobLike) {
      return this.jobLikeRepository.remove(jobLike);
    }
    const job = await this.queryBus.execute(new GetOneJobQuery(command.jobID));
    const user = await this.queryBus.execute(
      new GetOneUserQuery(command.userID),
    );
    const jobLikeNew = this.jobLikeRepository.create({
      job: job,
      user: user,
      userId: command.userID,
      jobId: command.jobID,
    });
    return this.jobLikeRepository.save(jobLikeNew);
  }
}
