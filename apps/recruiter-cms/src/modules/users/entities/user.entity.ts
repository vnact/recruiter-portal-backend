import { Column, Entity, Index, OneToMany } from 'typeorm';
import { Gender, ExpLevel } from '@vnact/recruiter-shared-enum';
import { AbstractEntity } from '@common/abstract.entity';
import { EducationEntity } from '@modules/education/entities/education.entity';
import { ExperienceEntity } from '@modules/experience/entities/experience.entity';
import { JobEntity } from '@modules/jobs/entities/job.entity';
import { UserSkillEntity } from './user-skill.entity';

@Entity('users')
export class UserEntity extends AbstractEntity {
  @Column('varchar')
  @Index({
    unique: true,
  })
  email: string;

  @Column('varchar')
  @Index({
    unique: true,
  })
  uid: string;

  @Column({
    enum: Gender,
    enumName: 'gender',
    default: Gender.Other,
  })
  gender?: Gender;

  @Column({
    type: 'date',
  })
  birthDay: Date;

  @Column({
    type: 'double precision',
    nullable: true,
  })
  height?: number;

  @Column({
    type: 'double precision',
    nullable: true,
  })
  weight?: number;

  @Column({
    enum: ExpLevel,
    nullable: true,
    default: ExpLevel.NoExp,
  })
  level: ExpLevel;

  @Column({
    nullable: true,
  })
  highSchool?: string;

  @Column({
    nullable: true,
  })
  familyRegisterNumber?: string;

  @Column({
    nullable: true,
  })
  identityCardNumber?: string;

  @Column({
    nullable: true,
  })
  hobby?: string;

  @Column({
    nullable: true,
  })
  character?: string;

  @Column({
    nullable: true,
  })
  placeOfOrigin?: string;

  @Column({
    nullable: true,
    type: 'text',
  })
  description?: string;

  @OneToMany(() => EducationEntity, (education) => education.user)
  educations: EducationEntity[];

  @OneToMany(() => ExperienceEntity, (experience) => experience.user)
  experiences: ExperienceEntity[];

  @OneToMany(() => UserSkillEntity, (userSkill) => userSkill.user)
  skills: UserSkillEntity[];

  @OneToMany(() => JobEntity, (job) => job.recruiter)
  postedJobs: JobEntity[];
}