import { Command } from '@nestjs-architects/typed-cqrs';
import { ICommandHandler, CommandHandler } from '@nestjs/cqrs';
import { UpdateUserSkillDto } from '../dto/update-user-skill';
import { UserSkillEntity } from '../entities/user-skill.entity';
import { UserSkillRepository } from '../repositories/user-skill.repository';

export class UpdateUserSkillCommand extends Command<UserSkillEntity> {
  constructor(
    public readonly userId: number,
    public readonly dto: UpdateUserSkillDto,
  ) {
    super();
  }
}

@CommandHandler(UpdateUserSkillCommand)
export class UpdateUserUserSkillHandler
  implements ICommandHandler<UpdateUserSkillCommand>
{
  constructor(private readonly userSkillRepository: UserSkillRepository) {}
  async execute(command: UpdateUserSkillCommand): Promise<UserSkillEntity[]> {
    const { userId, dto } = command;

    return;
  }
}
