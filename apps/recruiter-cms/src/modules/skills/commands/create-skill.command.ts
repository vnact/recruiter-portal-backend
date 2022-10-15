import { Command } from '@nestjs-architects/typed-cqrs';
import { BadRequestException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateSkillDto } from '../dto/create-skill.dto';
import { SkillEntity } from '../entities/skill.entity';
import { SkillRepository } from '../repositories/skill.repository';

export class CreateSkillCommand extends Command<SkillEntity> {
  constructor(public readonly createSkillDto: CreateSkillDto) {
    super();
  }
}

@CommandHandler(CreateSkillCommand)
export class CreateSkillCommandHandler
  implements ICommandHandler<CreateSkillCommand>
{
  constructor(private readonly skillRepository: SkillRepository) {}
  async execute(command: CreateSkillCommand): Promise<SkillEntity> {
    const { createSkillDto } = command;
    const skill = await this.skillRepository.findBy({
      name: createSkillDto.name,
    });
    if (skill) {
      throw new BadRequestException('Skill already exists');
    }
    const skillNew = this.skillRepository.create(createSkillDto);
    return this.skillRepository.save(skillNew);
  }
}
