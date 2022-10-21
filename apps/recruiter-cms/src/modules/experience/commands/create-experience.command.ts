import { GetOneCareerQuery } from '@modules/careers/queries/get-one-career';
import { GetOneCompanyQuery } from '@modules/companies/queries/get-one-company.query';
import { CreateJobSkillCommand } from '@modules/jobs/commands/create-job-skill.command';
import { GetOneSkillQuery } from '@modules/skills/queries/get-one-skill.query';
import { GetOneUserQuery } from '@modules/users/queries/get-one-user.query';
import { Command, CommandHandler } from '@nestjs-architects/typed-cqrs';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { CommandBus, ICommandHandler, QueryBus } from '@nestjs/cqrs';
import { CreateExperienceDto } from '../dto/create-experience.dto';
import { ExperienceEntity } from '../entities/experience.entity';
import { ExperienceRepository } from '../repositories/experience.repository';

export class CreateExperienceCommand extends Command<ExperienceEntity> {
  constructor(
    public readonly userId: number,
    public readonly creteExperienceDto: CreateExperienceDto,
  ) {
    super();
  }
}

@CommandHandler(CreateExperienceCommand)
export class CreateExperienceHandler
  implements ICommandHandler<CreateExperienceCommand>
{
  constructor(
    private readonly experienceRepository: ExperienceRepository,
    private readonly queryBus: QueryBus,
  ) {}
  async execute(command: CreateExperienceCommand) {
    const { creteExperienceDto, userId } = command;
    const user = await this.queryBus.execute(new GetOneUserQuery(userId));
    if (!user) {
      throw new BadRequestException('User not found');
    }
    const company = await this.queryBus.execute(
      new GetOneCompanyQuery(creteExperienceDto.company_id),
    );
    const career = await this.queryBus.execute(
      new GetOneCareerQuery(creteExperienceDto.career_id),
    );
    const skill = await this.queryBus.execute(
      new GetOneSkillQuery(creteExperienceDto.skill_id),
    );
    if (!skill) {
      throw new NotFoundException('Skill not found');
    }

    const experience = this.experienceRepository.create({
      startDate: creteExperienceDto.start_date,
      endDate: creteExperienceDto.end_date,
      title: creteExperienceDto.title,
      description: creteExperienceDto.description,
      employmentType: creteExperienceDto.employment_type,
      company: company,
      career: career,
      user: user,
    });

    return this.experienceRepository.save(experience);
  }
}
