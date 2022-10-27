import { AbstractEntity } from '@common/abstract.entity';
import { JobEntity } from '@modules/jobs/entities/job.entity';
import { UserEntity } from '@modules/users/entities/user.entity';
import { Column, Entity, ManyToOne } from 'typeorm';

@Entity('favorite_job')
export class FavoriteJobEntity extends AbstractEntity {
  @Column()
  jobId: number;

  @Column()
  userId: number;

  @ManyToOne(() => UserEntity)
  user: UserEntity;

  @ManyToOne(() => JobEntity, {
    onDelete: 'CASCADE',
    eager: true,
  })
  job: JobEntity;
}
