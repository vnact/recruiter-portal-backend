import { GetOneCareerQuery } from '@modules/careers/queries/get-one-career';
import { GetOneCompanyQuery } from '@modules/companies/queries/get-one-company.query';
import { GetOneUserQuery } from '@modules/users/queries/get-one-user.query';
import { Command, CommandHandler } from '@nestjs-architects/typed-cqrs';
import { BadRequestException } from '@nestjs/common';
import { ICommandHandler, QueryBus } from '@nestjs/cqrs';
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

    const experience = this.experienceRepository.create({
      startDate: creteExperienceDto.start_date,
      endDate: creteExperienceDto.end_date,
      title: creteExperienceDto.title,
      description: creteExperienceDto.description,
      company: company,
      career: career,
      user: user,
      employmentType: creteExperienceDto.employment_type,
    });

    return this.experienceRepository.save(experience);
  }
}
