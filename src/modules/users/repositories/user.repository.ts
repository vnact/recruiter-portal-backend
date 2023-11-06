import { Repository } from 'typeorm';
import { UserEntity } from '../entities/user.entity';
import { CustomRepository } from '@decorators/typeorm-ex.decorator';

@CustomRepository(UserEntity)
export class UserRepository extends Repository<UserEntity> {}
