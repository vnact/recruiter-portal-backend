import { SkillEntity } from '@modules/skills/entities/skill.entity';
import { Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm';
import { JobEntity } from './job.entity';

@Entity('job_skill')
export class JobSkillEntity {
  @ManyToOne(() => JobEntity)
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
