import { AbstractEntity } from '@common/abstract.entity';
import { JobEntity } from '@modules/jobs/entities/job.entity';
import { UserEntity } from '@modules/users/entities/user.entity';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';

@Entity('apply')
export class ApplyEntity extends AbstractEntity {
  @Column('int')
  jobID: number;

  @Column('int')
  userId: number;

  @ManyToOne(() => JobEntity, {
    onDelete: 'CASCADE',
  })
  job?: JobEntity;

  @ManyToOne(() => UserEntity, {
    nullable: true,
    onDelete: 'CASCADE',
  })
  user?: UserEntity;
}
