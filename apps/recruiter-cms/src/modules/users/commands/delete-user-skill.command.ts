import { Command } from '@nestjs-architects/typed-cqrs';
import { BadRequestException } from '@nestjs/common';
import { ICommandHandler, CommandHandler } from '@nestjs/cqrs';
import { UpdateUserSkillDto } from '../dto/update-user-skill';
import { UserSkillEntity } from '../entities/user-skill.entity';
import { UserSkillRepository } from '../repositories/user-skill.repository';

export class DeleteUserSkillCommand extends Command<UserSkillEntity> {
  constructor(
    public readonly userId: number,
    public readonly dto: UpdateUserSkillDto,
  ) {
    super();
  }
}

@CommandHandler(DeleteUserSkillCommand)
export class DeleteUserSkillCommandHandler
  implements ICommandHandler<DeleteUserSkillCommand>
{
  constructor(private readonly userSkillRepository: UserSkillRepository) {}
  async execute(command: DeleteUserSkillCommand) {
    const { userId, dto } = command;
    const query = await this.userSkillRepository
      .createQueryBuilder('user_skill')
      .delete()
      .where('user_skill.user_id = :userId', { userId })
      .andWhere('user_skill.skill_id IN  (:...skills_ids) ', {
        skills_ids: dto.skills_id,
      });
    return query.execute();
  }
}
