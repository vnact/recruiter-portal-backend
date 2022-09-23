import { Query } from '@nestjs-architects/typed-cqrs';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { UserEntity } from '../entities/user.entity';
import { UserRepository } from '../repositories/user.repository';

export class GetOneUserQuery extends Query<UserEntity | null> {
  constructor(public readonly email: string) {
    super();
  }
}

@QueryHandler(GetOneUserQuery)
export class GetOneUserQueryHandler implements IQueryHandler<GetOneUserQuery> {
  constructor(private readonly userRepository: UserRepository) {}
  execute(query: GetOneUserQuery): Promise<UserEntity | null> {
    return this.userRepository.findOne({
      where: {
        email: query.email,
      },
    });
  }
}
