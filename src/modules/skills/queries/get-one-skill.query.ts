import { Query } from '@nestjs-architects/typed-cqrs';
import { NotFoundException } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { SkillEntity } from '../entities/skill.entity';
import { SkillRepository } from '../repositories/skill.repository';

export class GetOneSkillQuery extends Query<SkillEntity> {
  constructor(public readonly id: number) {
    super();
  }
}

@QueryHandler(GetOneSkillQuery)
export class GetOneSkillQueryHandler
  implements IQueryHandler<GetOneSkillQuery>
{
  constructor(private readonly skillRepository: SkillRepository) {}
  async execute(query: GetOneSkillQuery): Promise<SkillEntity> {
    const { id } = query;
    const skill = await this.skillRepository.findOneBy({ id });
    if (!skill) {
      throw new NotFoundException('Skill not found');
    }
    return skill;
  }
}
