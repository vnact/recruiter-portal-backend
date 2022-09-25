import { UserRepository } from '../repositories/user.repository';
import { Query } from '@nestjs-architects/typed-cqrs';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { UserRole } from '@vnact/recruiter-shared-enum';

export class GetRoleRecordQuery extends Query<UserRole> {
  constructor(public readonly userId: number) {
    super();
  }
}

@QueryHandler(GetRoleRecordQuery)
export class GetRoleRecordQueryHandler
  implements IQueryHandler<GetRoleRecordQuery>
{
  constructor(private readonly userRepository: UserRepository) {}
  async execute(query: GetRoleRecordQuery): Promise<UserRole> {
    // TODO: use redis
    const user = await this.userRepository.findOneByOrFail({
      id: query.userId,
    });
    return user.role;
  }
}
