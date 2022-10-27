import { CustomRepository } from '@decorators/typeorm-ex.decorator';
import { Repository } from 'typeorm';
import { FavoriteJobEntity } from '../entities/favorite-job.entity';

@CustomRepository(FavoriteJobEntity)
export class FavoriteJobRepository extends Repository<FavoriteJobEntity> {}
