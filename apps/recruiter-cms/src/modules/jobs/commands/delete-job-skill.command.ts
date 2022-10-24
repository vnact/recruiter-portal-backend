import { Command } from '@nestjs-architects/typed-cqrs';
import { CommandHandler, ICommandHandler, QueryBus } from '@nestjs/cqrs';
import { JobSkillEntity } from '../entities/job-skill.entity';
import { GetOneJobSkillQuery } from '../queries/get-one-job-skill.query';
import { JobSkillRepository } from '../repositories/job-skill.repository';

export class DeleteJobSkillCommand extends Command<JobSkillEntity> {
  constructor(public readonly id: number) {
    super();
  }
}

@CommandHandler(DeleteJobSkillCommand)
export class DeleteJobSkillCommandHandler
  implements ICommandHandler<DeleteJobSkillCommand>
{
  constructor(
    private readonly jobSkillRepository: JobSkillRepository,
    private readonly queryBus: QueryBus,
  ) {}
  async execute(command: DeleteJobSkillCommand): Promise<any> {
    const { id } = command;
    const query = this.jobSkillRepository
      .createQueryBuilder()
      .delete()
      .where('jobId IN (:id)', { id });
    return query.execute();
  }
}
