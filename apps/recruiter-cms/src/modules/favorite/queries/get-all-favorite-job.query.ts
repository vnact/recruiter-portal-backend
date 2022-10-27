import { Query } from '@nestjs-architects/typed-cqrs';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { FavoriteJobEntity } from '../entities/favorite-job.entity';
import { FavoriteJobRepository } from '../repositories/favorite-job.repository';

export class GetAllFavoriteJobQuery extends Query<FavoriteJobEntity> {
  constructor(public readonly userId: number) {
    super();
  }
}

@QueryHandler(GetAllFavoriteJobQuery)
export class GetAllFavoriteJobQueryHandler
  implements IQueryHandler<GetAllFavoriteJobQuery>
{
  constructor(private readonly favoriteJobRepository: FavoriteJobRepository) {}
  execute(query: GetAllFavoriteJobQuery): Promise<FavoriteJobEntity[]> {
    const { userId } = query;
    return this.favoriteJobRepository.find({ where: { userId } });
  }
}
