import { GetOneCareerQuery } from '@modules/careers/queries/get-one-career';
import { GetOneCompanyQuery } from '@modules/companies/queries/get-one-company.query';
import { GetOneSkillQuery } from '@modules/skills/queries/get-one-skill.query';
import { GetOneUserQuery } from '@modules/users/queries/get-one-user.query';
import { Command } from '@nestjs-architects/typed-cqrs';
import { NotFoundException } from '@nestjs/common';
import {
  CommandBus,
  CommandHandler,
  ICommandHandler,
  QueryBus,
} from '@nestjs/cqrs';
import { CreateJobDto } from '../dto/create-job.dto';
import { JobEntity } from '../entities/job.entity';
import { JobRepository } from '../repositories/job.repository';
import { CreateJobSkillCommand } from './create-job-skill.command';

export class CreateJobCommand extends Command<JobEntity> {
  constructor(
    public readonly userId: number,
    public readonly createJobDto: CreateJobDto,
  ) {
    super();
  }
}

@CommandHandler(CreateJobCommand)
export class CreateJobCommandHandler
  implements ICommandHandler<CreateJobCommand>
{
  constructor(
    private readonly jobRepository: JobRepository,
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus,
  ) {}

  async execute(command: CreateJobCommand): Promise<JobEntity> {
    const { userId, createJobDto } = command;
    const user = await this.queryBus.execute(new GetOneUserQuery(userId));
    if (!user) {
      throw new NotFoundException('User not found');
    }
    const company = await this.queryBus.execute(
      new GetOneCompanyQuery(createJobDto.company_id),
    );
    const career = await this.queryBus.execute(
      new GetOneCareerQuery(createJobDto.career_id),
    );
    const job = this.jobRepository.create({
      ...createJobDto,
      company,
      recruiter: user,
      career,
    });
    await this.jobRepository.save(job);
    await this.commandBus.execute(
      new CreateJobSkillCommand({
        job_id: job.id,
        skillRequires: createJobDto.skillRequires,
      }),
    );

    return job;
  }
}
