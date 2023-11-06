import {
  IQueryHandler,
  Query,
  QueryHandler,
} from '@nestjs-architects/typed-cqrs';
import { In } from 'typeorm';
import { CareerEntity } from '../entities/career.entity';
import { CareerRepository } from '../repositories/career.repository';

export class GetAllCareerByIdQuery extends Query<CareerEntity[]> {
  constructor(public readonly listId: number[]) {
    super();
  }
}

@QueryHandler(GetAllCareerByIdQuery)
export class GetAllCarrerByIdQueryHandler
  implements IQueryHandler<GetAllCareerByIdQuery>
{
  constructor(private readonly careerRepository: CareerRepository) {}
  async execute(query: GetAllCareerByIdQuery): Promise<CareerEntity[]> {
    const { listId } = query;
    return this.careerRepository.find({
      where: { id: In(listId) },
    });
  }
}
