import { Query } from '@nestjs-architects/typed-cqrs';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { SkillEntity } from '../entities/skill.entity';
import { SkillRepository } from '../repositories/skill.repository';

export class GetAllSkillQUery extends Query<SkillEntity[]> {
  constructor() {
    super();
  }
}

@QueryHandler(GetAllSkillQUery)
export class GetAllSkillQueryHandler
  implements IQueryHandler<GetAllSkillQUery>
{
  constructor(private readonly skillRepository: SkillRepository) {}
  async execute(): Promise<SkillEntity[]> {
    return this.skillRepository.find();
  }
}
