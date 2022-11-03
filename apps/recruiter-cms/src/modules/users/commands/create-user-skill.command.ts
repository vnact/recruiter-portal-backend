import { Command } from '@nestjs-architects/typed-cqrs';
import { BadRequestException, HttpException, HttpStatus } from '@nestjs/common';
import { ICommandHandler, CommandHandler } from '@nestjs/cqrs';
import { CreateUserSkillDto } from '../dto/create-user-skill.dto';
import { UserSkillEntity } from '../entities/user-skill.entity';
import { UserSkillRepository } from '../repositories/user-skill.repository';
export class CreateUserSkillCommand extends Command<UserSkillEntity> {
  constructor(
    public readonly userId: number,
    public readonly dto: CreateUserSkillDto,
  ) {
    super();
  }
}

@CommandHandler(CreateUserSkillCommand)
export class CreateUserSkillHandler
  implements ICommandHandler<CreateUserSkillCommand>
{
  constructor(private readonly userSkillRepository: UserSkillRepository) {}
  async execute(command: CreateUserSkillCommand) {
    const { dto, userId } = command;
    const checkSkill = await this.userSkillRepository
      .createQueryBuilder('user_skill')
      .where('user_skill.user_id = :userId', { userId })
      .andWhere('user_skill.skill_id IN (:...skillsId)', {
        skillsId: dto.skills_id,
      })
      .getMany();
    if (checkSkill.length) {
      throw new BadRequestException('Skill already exists');
    }
    return Promise.all(
      dto.skills_id.map(async (skillId) => {
        const user_skill = this.userSkillRepository.create({
          userId: userId,
          skillId,
          certificate: dto.certificate,
          description: dto.description,
        });
        await this.userSkillRepository.save(user_skill);
      }),
    );
  }
}
