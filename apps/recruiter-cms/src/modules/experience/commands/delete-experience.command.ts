import { Command } from '@nestjs-architects/typed-cqrs';
import { ForbiddenException } from '@nestjs/common';
import { CommandHandler, ICommandHandler, QueryBus } from '@nestjs/cqrs';
import { ExperienceEntity } from '../entities/experience.entity';
import { GetOneExperienceQuery } from '../queries/get-one-experience.query';
import { ExperienceRepository } from '../repositories/experience.repository';

export class DeleteExperienceCommand extends Command<ExperienceEntity> {
  constructor(public readonly id: number, public readonly userId: number) {
    super();
  }
}

@CommandHandler(DeleteExperienceCommand)
export class DeleteExperienceCommandHandler
  implements ICommandHandler<DeleteExperienceCommand>
{
  constructor(
    private readonly experienceRepository: ExperienceRepository,
    private readonly queryBus: QueryBus,
  ) {}
  async execute(command: DeleteExperienceCommand): Promise<ExperienceEntity> {
    const { id, userId } = command;
    const experience = await this.queryBus.execute(
      new GetOneExperienceQuery(id),
    );

    if (experience.user.id !== userId) {
      throw new ForbiddenException(
        'You are not allowed to delete this experience',
      );
    }
    await this.experienceRepository.delete(experience.id);
    return experience;
  }
}
