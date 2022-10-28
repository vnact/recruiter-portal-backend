import { Query } from '@nestjs-architects/typed-cqrs';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { UserEntity } from '../entities/user.entity';
import { UserRepository } from '../repositories/user.repository';

export class GetOneUserByEmailQuery extends Query<UserEntity | null> {
  constructor(public readonly email: string) {
    super();
  }
}

@QueryHandler(GetOneUserByEmailQuery)
export class GetOneUserByEmailQueryHandler
  implements IQueryHandler<GetOneUserByEmailQuery>
{
  constructor(private readonly userRepository: UserRepository) {}
  execute(query: GetOneUserByEmailQuery): Promise<UserEntity | null> {
    return this.userRepository.findOne({
      where: {
        email: query.email,
      },
      relations: {
        educations: true,
        experiences: {
          company: true,
        },
        favoriteJobs: {
          job: true,
        },
        appliedJobs: {
          job: true,
        },
      },
    });
  }
}
