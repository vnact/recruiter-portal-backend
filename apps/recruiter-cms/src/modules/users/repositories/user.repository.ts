import { Repository } from 'typeorm';
import { UserEntity } from '../entities/user.entity';

export class UserRepository extends Repository<UserEntity> {}
