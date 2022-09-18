import { AbstractEntity } from '@common/abstract.entity';
import { Column, Entity, ManyToOne } from 'typeorm';
import { CompanySize } from '@vnact/recruiter-shared-enum';
import { IndustryEntity } from './industry.entity';

@Entity('companies')
export class CompanyEntity extends AbstractEntity {
  @Column('varchar')
  name: string;

  @Column('varchar')
  phone: string;

  @Column('varchar')
  email: string;

  @Column('varchar')
  tax_number: string;

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
  gps_lat: number;

  @Column('double precision')
  gps_lng: number;

  @Column('int')
  provinceId: number;

  @ManyToOne(() => IndustryEntity, {
    nullable: true,
  })
  industry?: IndustryEntity;
}
