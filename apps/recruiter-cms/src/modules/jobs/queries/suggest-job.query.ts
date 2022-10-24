import { GetAllSkillUser } from '@modules/users/queries/get-all-skill-of -user';
import { Query } from '@nestjs-architects/typed-cqrs';
import { IQueryHandler, QueryBus, QueryHandler } from '@nestjs/cqrs';
import { JobEntity } from '../entities/job.entity';
import { JobRepository } from '../repositories/job.repository';

export class SuggestJobQuery extends Query<JobEntity[]> {
  constructor(public readonly id: number) {
    super();
  }
}

@QueryHandler(SuggestJobQuery)
export class SuggestJobQueryHandler implements IQueryHandler<SuggestJobQuery> {
  constructor(
    private readonly jobRepository: JobRepository,
    private readonly queryBus: QueryBus,
  ) {}
  async execute(query: SuggestJobQuery): Promise<JobEntity[]> {
    const { id } = query;
    const skills_user = await this.queryBus.execute(new GetAllSkillUser(id));
    console.log(skills_user);
    const jobSuggestions = await this.jobRepository
      .createQueryBuilder('job')
      .where('job.id IN (:...skillIds)', {
        skillIds: skills_user.map((skill) => skill.skillId) || [],
      })
      .orderBy('job.createdAt', 'DESC')
      .getMany();
    console.log(jobSuggestions);
    return jobSuggestions;
  }
}
