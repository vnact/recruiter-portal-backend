import { AbstractEntity } from '@common/abstract.entity';
import { SkillEntity } from '@modules/skills/entities/skill.entity';
import { Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm';
import { JobEntity } from './job.entity';

@Entity('job_skill')
export class JobSkillEntity extends AbstractEntity {
  @ManyToOne(() => JobEntity, {
    onDelete: 'CASCADE',
  })
  job: JobEntity;

  @ManyToOne(() => SkillEntity)
  skill: SkillEntity;

  @PrimaryColumn()
  jobId: number;

  @PrimaryColumn()
  skillId: number;

  @Column({
    default: true,
    type: 'boolean',
  })
  isRequired: boolean;
}
