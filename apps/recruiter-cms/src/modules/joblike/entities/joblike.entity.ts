import { AbstractEntity } from '@common/abstract.entity';
import { JobEntity } from '@modules/jobs/entities/job.entity';
import { UserEntity } from '@modules/users/entities/user.entity';
import { Column, Entity, ManyToOne } from 'typeorm';

@Entity('joblikes')
export class JobLikeEntity extends AbstractEntity {
  @Column()
  jobId: number;

  @Column()
  userId: number;

  @ManyToOne(() => UserEntity)
  user: UserEntity;

  @ManyToOne(() => JobEntity, {
    onDelete: 'CASCADE',
  })
  job: JobEntity;
}
