import { AbstractEntity } from '@common/abstract.entity';
import { UserEntity } from '@modules/users/entities/user.entity';
import { Column, Entity, ManyToMany } from 'typeorm';

@Entity('skills')
export class SkillEntity extends AbstractEntity {
  @Column('varchar')
  name: string;

  @Column('varchar', {
    nullable: true,
  })
  description?: string;

  @ManyToMany(() => UserEntity)
  users: UserEntity[];
}
