import { CareerEntity } from '@modules/careers/entities/career.entity';
import { UserEntity } from '@modules/users/entities/user.entity';
import { AbstractEntity } from '@common/abstract.entity';
import { Column, Entity, ManyToOne } from 'typeorm';
import { EmploymentType } from '@vnact/recruiter-shared-enum';
import { CompanyEntity } from '@modules/companies/entities/company.entity';

@Entity('experience')
export class ExperienceEntity extends AbstractEntity {
  @ManyToOne(() => UserEntity)
  user: UserEntity;

  @Column({
    nullable: true,
  })
  title?: string;

  @ManyToOne(() => CareerEntity, {
    nullable: true,
  })
  career?: CareerEntity;

  @ManyToOne(() => CompanyEntity, {
    nullable: true,
  })
  company?: CompanyEntity;

  @Column({
    type: 'varchar',
    nullable: true,
  })
  companyName?: string;

  @Column({
    enum: EmploymentType,
    enumName: 'employment_type',
  })
  employmentType: EmploymentType;

  @Column({
    type: 'date',
  })
  startDate: Date;

  @Column({
    type: 'date',
    nullable: true,
  })
  endDate?: Date | string;

  @Column('text', {
    nullable: true,
  })
  description?: string;
}
