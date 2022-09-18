import {
  Column,
  Entity,
  Index,
  JoinTable,
  ManyToMany,
  OneToMany,
} from 'typeorm';
import { Gender, ExpLevel } from '@vnact/recruiter-shared-enum';
import { AbstractEntity } from '@common/abstract.entity';
import { EducationEntity } from '@modules/education/entities/education.entity';
import { ExperienceEntity } from '@modules/experience/entities/experience.entity';
import { SkillEntity } from '@modules/skills/entities/skill.entity';

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

  @OneToMany(() => EducationEntity, (education) => education.id)
  educations: EducationEntity[];

  @OneToMany(() => ExperienceEntity, (experience) => experience.id)
  experiences: ExperienceEntity[];

  @ManyToMany(() => SkillEntity)
  @JoinTable({
    name: 'user_skill',
  })
  skills: SkillEntity[];
}
