import { Query } from '@nestjs-architects/typed-cqrs';
import { NotFoundException } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { ExperienceEntity } from '../entities/experience.entity';
import { ExperienceRepository } from '../repositories/experience.repository';

export class GetOneExperienceQuery extends Query<ExperienceEntity> {
  constructor(public readonly id: number) {
    super();
  }
}

@QueryHandler(GetOneExperienceQuery)
export class GetOneExperienceQueryHandler
  implements IQueryHandler<GetOneExperienceQuery>
{
  constructor(private readonly experienceRepository: ExperienceRepository) {}
  async execute(query: GetOneExperienceQuery): Promise<ExperienceEntity> {
    const { id } = query;
    const experience = await this.experienceRepository.findOne({
      where: { id },
      relations: {
        career: true,
        company: true,
        user: true,
      },
    });

    if (!experience) {
      throw new NotFoundException('Experience not found');
    }
    return experience;
  }
}
