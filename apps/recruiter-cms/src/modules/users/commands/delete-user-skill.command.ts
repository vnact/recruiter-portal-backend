import { Command } from '@nestjs-architects/typed-cqrs';
import { BadRequestException } from '@nestjs/common';
import { ICommandHandler, CommandHandler } from '@nestjs/cqrs';
import { UpdateUserSkillDto } from '../dto/update-user-skill';
import { UserSkillEntity } from '../entities/user-skill.entity';
import { UserSkillRepository } from '../repositories/user-skill.repository';
import { UpdateUserSkillCommand } from './update-user-skill.command';

export class DeleteUserSkillCommand extends Command<UserSkillEntity> {
  constructor(
    public readonly userId: number,
    public readonly dto: UpdateUserSkillDto,
  ) {
    super();
  }
}

@CommandHandler(UpdateUserSkillCommand)
export class DeleteUserUserSkillHandler
  implements ICommandHandler<DeleteUserSkillCommand>
{
  constructor(private readonly userSkillRepository: UserSkillRepository) {}
  async execute(command: UpdateUserSkillCommand) {
    const { userId, dto } = command;
    const query = this.userSkillRepository
      .createQueryBuilder('user_skill')
      .softDelete()
      .where('user_skill.user_id = :userId', { userId })
      .andWhere('user_skill.skill_id IN  (:...skills_id) ', {
        skills_ids: dto.skills_id,
      });
    return query.execute();
  }
}
