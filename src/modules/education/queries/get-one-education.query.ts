import { Query } from '@nestjs-architects/typed-cqrs';
import { NotFoundException } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { EducationEntity } from '../entities/education.entity';
import { EducationRepository } from '../repositories/education.repository';

export class GetOneEducationQuery extends Query<EducationEntity> {
  constructor(public readonly id: number) {
    super();
  }
}

@QueryHandler(GetOneEducationQuery)
export class GetOneEducationQueryHandler
  implements IQueryHandler<GetOneEducationQuery>
{
  constructor(private readonly educationRepository: EducationRepository) {}
  async execute(query: GetOneEducationQuery): Promise<EducationEntity> {
    const { id } = query;
    const education = await this.educationRepository
      .createQueryBuilder('education')
      .where('education.id = :id', { id })
      .innerJoinAndSelect('education.user', 'user')
      .getOne();
    if (!education) {
      throw new NotFoundException('Education not found');
    }
    return education;
  }
}
