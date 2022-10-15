import { Query } from '@nestjs-architects/typed-cqrs';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { CareerEntity } from '../entities/career.entity';
import { NotFoundException } from '@nestjs/common';
import { CareerRepository } from '../repositories/career.repository';
export class GetOneCareerQuery extends Query<CareerEntity> {
  constructor(public readonly id: number) {
    super();
  }
}

@QueryHandler(GetOneCareerQuery)
export class GetOneCareerQueryHandler
  implements IQueryHandler<GetOneCareerQuery>
{
  constructor(private readonly careerRepository: CareerRepository) {}
  async execute(query: GetOneCareerQuery): Promise<CareerEntity> {
    const { id } = query;
    const career = await this.careerRepository.findOneBy({ id });
    if (!career) {
      throw new NotFoundException('Career not found');
    }
    return career;
  }
}
