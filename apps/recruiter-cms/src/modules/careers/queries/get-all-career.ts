import {
  IQueryHandler,
  Query,
  QueryHandler,
} from '@nestjs-architects/typed-cqrs';
import { CareerEntity } from '../entities/career.entity';
import { CareerRepository } from '../repositories/career.repository';

export class GetALlCareerQuery extends Query<CareerEntity[]> {
  constructor() {
    super();
  }
}

@QueryHandler(GetALlCareerQuery)
export class GetAllCarrerQueryHandler
  implements IQueryHandler<GetALlCareerQuery>
{
  constructor(private readonly careerRepository: CareerRepository) {}
  async execute(): Promise<CareerEntity[]> {
    return this.careerRepository.find({
      relations: {
        parent: true,
        industry: true,
      },
    });
  }
}
