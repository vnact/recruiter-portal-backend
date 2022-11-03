import {
  IQueryHandler,
  Query,
  QueryHandler,
} from '@nestjs-architects/typed-cqrs';
import { UserSkillEntity } from '../entities/user-skill.entity';
import { UserSkillRepository } from '../repositories/user-skill.repository';

export class GetOneUserSkillQuery extends Query<UserSkillEntity> {
  constructor(public readonly userId: number, public readonly skillId: number) {
    super();
  }
}

@QueryHandler(GetOneUserSkillQuery)
export class GetOneUserSkillQueryHandler
  implements IQueryHandler<GetOneUserSkillQuery>
{
  constructor(private readonly userSkillRepository: UserSkillRepository) {}

  async execute(query: GetOneUserSkillQuery): Promise<UserSkillEntity> {
    const { userId, skillId } = query;

    return this.userSkillRepository.findOne({
      where: {
        userId,
        skillId,
      },
    });
  }
}
