// eslint-disable-next-line @typescript-eslint/no-unused-vars
import {
  IQueryHandler,
  Query,
  QueryBus,
  QueryHandler,
} from '@nestjs-architects/typed-cqrs';
import { EducationEntity } from '../entities/education.entity';
import { EducationRepository } from '../repositories/education.repository';

export class GetByIdEducationQuery extends Query<EducationEntity> {
  constructor(public readonly id: number, public readonly userId: number) {
    super();
  }
}
@QueryHandler(GetByIdEducationQuery)
export class GetByIdEducationQueryHandler
  implements IQueryHandler<GetByIdEducationQuery>
{
  constructor(
    private readonly educationRepository: EducationRepository,
    private readonly queryBus: QueryBus,
  ) {}
  async execute(query: GetByIdEducationQuery): Promise<EducationEntity> {
    const { id, userId } = query;
    const education = await this.educationRepository.findOneBy({ id: id });
    return education;
  }
}
