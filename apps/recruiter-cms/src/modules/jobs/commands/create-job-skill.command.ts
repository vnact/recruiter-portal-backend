import { GetOneSkillQuery } from '@modules/skills/queries/get-one-skill.query';
import { Command } from '@nestjs-architects/typed-cqrs';
import { NotFoundException } from '@nestjs/common';
import { CommandHandler, ICommandHandler, QueryBus } from '@nestjs/cqrs';
import { CreateJobSkillDto } from '../dto/create-job-skill';
import { JobSkillEntity } from '../entities/job-skill.entity';
import { GetOneJobQuery } from '../queries/get-one-job.query';
import { JobSkillRepository } from '../repositories/job-skill.repository';

export class CreateJobSkillCommand extends Command<JobSkillEntity> {
  constructor(public readonly dto: CreateJobSkillDto) {
    super();
  }
}

@CommandHandler(CreateJobSkillCommand)
export class CreateJobSkillHandler
  implements ICommandHandler<CreateJobSkillCommand>
{
  constructor(
    private readonly jobSkillRepository: JobSkillRepository,
    private readonly queryBus: QueryBus,
  ) {}
  async execute(command: CreateJobSkillCommand) {
    const { dto } = command;
    console.log(dto);
    const job = await this.queryBus.execute(new GetOneJobQuery(dto.job_id));
    if (!job) {
      throw new NotFoundException('Job not found');
    }
    return Promise.all(
      dto.skillRequires.map(async (skillRequire) => {
        const skill = await this.queryBus.execute(
          new GetOneSkillQuery(skillRequire.skill_id),
        );
        if (!skill) {
          throw new NotFoundException('Skill not found');
        }
        const jobSkill = this.jobSkillRepository.create({
          jobId: job.id,
          skillId: skillRequire.skill_id,
          isRequired: skillRequire.is_required,
        });
        jobSkill.skill = skill;
        jobSkill.job = job;
        return this.jobSkillRepository.save(jobSkill);
      }),
    );
  }
}
