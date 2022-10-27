import { GetOneJobQuery } from '@modules/jobs/queries/get-one-job.query';
import { GetOneUserQuery } from '@modules/users/queries/get-one-user.query';
import { Command } from '@nestjs-architects/typed-cqrs';
import { CommandHandler, ICommandHandler, QueryBus } from '@nestjs/cqrs';
import { FavoriteJobEntity } from '../entities/favorite-job.entity';
import { FavoriteJobRepository } from '../repositories/favorite-job.repository';

export class AddFavoriteJobCommand extends Command<FavoriteJobEntity> {
  constructor(public readonly jobId: number, public readonly userId: number) {
    super();
  }
}

@CommandHandler(AddFavoriteJobCommand)
export class AddFavoriteJobCommandHandler
  implements ICommandHandler<AddFavoriteJobCommand>
{
  constructor(
    private readonly favoriteJobRepository: FavoriteJobRepository,
    private readonly queryBus: QueryBus,
  ) {}
  async execute(command: AddFavoriteJobCommand): Promise<FavoriteJobEntity> {
    const { jobId, userId } = command;
    const favoriteJob = await this.favoriteJobRepository.findOne({
      where: {
        jobId,
        userId,
      },
    });
    if (favoriteJob) {
      return this.favoriteJobRepository.remove(favoriteJob);
    }
    const [job, user] = await Promise.all(
      [new GetOneJobQuery(jobId), new GetOneUserQuery(userId)].map((query) =>
        this.queryBus.execute(query),
      ),
    );
    const favoriteJobNew = this.favoriteJobRepository.create({
      job: job,
      user: user,
    });
    return this.favoriteJobRepository.save(favoriteJobNew);
  }
}
