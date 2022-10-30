import { AbstractEntity } from '@common/abstract.entity';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { CompanySize } from 'src/constants/enum';
import { IndustryEntity } from './industry.entity';
import { JobEntity } from '@modules/jobs/entities/job.entity';

@Entity('companies')
export class CompanyEntity extends AbstractEntity {
  @Column('varchar')
  name: string;

  @Column('varchar')
  phone: string;

  @Column('varchar')
  email: string;

  @Column('varchar')
  taxNumber: string;

  @Column({
    type: 'varchar',
    nullable: true,
  })
  website?: string;

  @Column({
    enum: CompanySize,
    nullable: true,
    default: CompanySize.OnePlus,
  })
  size?: CompanySize;

  @Column({
    type: 'text',
    nullable: true,
  })
  description?: string;

  @Column({
    nullable: true,
  })
  address?: string;

  @Column('double precision')
  gpsLat: number;

  @Column('double precision')
  gpsLng: number;

  @Column('int')
  provinceId: number;

  @ManyToOne(() => IndustryEntity, {
    nullable: true,
  })
  industry?: IndustryEntity;

  @OneToMany(() => JobEntity, (job) => job.company)
  jobs: JobEntity[];
}
