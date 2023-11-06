import { UserRepository } from '@modules/users/repositories/user.repository';
import {
  IQueryHandler,
  Query,
  QueryHandler,
} from '@nestjs-architects/typed-cqrs';
import { EducationEntity } from '../entities/education.entity';
import { EducationRepository } from '../repositories/education.repository';

export class GetByUserEducationQuery extends Query<EducationEntity[]> {
  constructor(public readonly userId: number) {
    super();
  }
}
@QueryHandler(GetByUserEducationQuery)
export class GetByUserEducationQueryHandler
  implements IQueryHandler<GetByUserEducationQuery>
{
  constructor(private readonly educationRepository: EducationRepository) {}
  async execute(query: GetByUserEducationQuery) {
    const { userId } = query;
    const data = await this.educationRepository.findBy({
      user: { id: userId },
    });
    return data;
  }
}
