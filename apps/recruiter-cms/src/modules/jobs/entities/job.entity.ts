import { AbstractEntity } from '@common/abstract.entity';
import { CompanyEntity } from '@modules/companies/entities/company.entity';
import { UserEntity } from '@modules/users/entities/user.entity';
import {
  EmploymentType,
  Gender,
  Workplace,
} from '@vnact/recruiter-shared-enum';
import { Column, Entity, ManyToOne } from 'typeorm';

@Entity('jobs')
export class JobEntity extends AbstractEntity {
  @Column('varchar')
  title: string;

  @Column('varchar', {
    nullable: true,
  })
  description?: string;

  @Column('varchar')
  location?: string;

  @Column('double precision')
  gpsLat: number;

  @Column('double precision')
  gpsLng: number;

  @Column({
    enum: Gender,
    array: true,
    type: 'varchar',
  })
  gender: Gender[];

  @Column('int', {
    nullable: true,
  })
  minSalary?: number;

  @Column('int', {
    nullable: true,
  })
  maxSalary?: number;

  @Column('date')
  startDate: Date;

  @Column('date', {
    nullable: true,
  })
  endDate?: Date;

  @ManyToOne(() => CompanyEntity, (company) => company.jobs)
  company: CompanyEntity;

  @ManyToOne(() => UserEntity, (user) => user.postedJobs)
  recruiter: UserEntity;

  @Column({
    enum: EmploymentType,
    array: true,
    type: 'varchar',
  })
  employmentType: EmploymentType[];

  @Column({
    enum: Workplace,
    array: true,
    type: 'varchar',
  })
  workplaces: Workplace[];

  @Column({
    type: 'smallint',
    default: 0,
  })
  applies: number;

  @Column({
    type: 'smallint',
    default: 0,
  })
  recruits: number;
}