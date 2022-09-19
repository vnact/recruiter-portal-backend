import { AbstractEntity } from '@common/abstract.entity';
import { UserEntity } from '@modules/users/entities/user.entity';
import { Column, Entity, ManyToOne } from 'typeorm';

@Entity('education')
export class EducationEntity extends AbstractEntity {
  @ManyToOne(() => UserEntity)
  user: UserEntity;

  @Column('varchar')
  school: string;

  @Column({
    nullable: true,
    type: 'varchar',
  })
  degree?: string;

  @Column({
    nullable: true,
  })
  fieldOfStudy: string;

  @Column({
    type: 'boolean',
    default: false,
  })
  isCompleted: boolean;

  @Column('date')
  startTime: Date;

  @Column({
    type: 'date',
    nullable: true,
  })
  endTime?: Date;

  @Column({
    nullable: true,
  })
  grade?: Date;

  @Column({
    nullable: true,
    type: 'text',
  })
  description: string;
}
