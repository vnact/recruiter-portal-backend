import { Query } from '@nestjs-architects/typed-cqrs';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { UserSkillEntity } from '../entities/user-skill.entity';
import { UserSkillRepository } from '../repositories/user-skill.repository';
export class GetAllSkillUser extends Query<UserSkillEntity[]> {
  constructor(public readonly userId: number) {
    super();
  }
}

@QueryHandler(GetAllSkillUser)
export class GetAllSkillUserHandler implements IQueryHandler<GetAllSkillUser> {
  constructor(private readonly userSkillRepository: UserSkillRepository) {}
  async execute(query: GetAllSkillUser) {
    const { userId } = query;
    const skills = await this.userSkillRepository.find({
      where: {
        user: {
          id: userId,
        },
      },
      relations: {
        skill: true,
      },
    });
    return skills;
  }
}
