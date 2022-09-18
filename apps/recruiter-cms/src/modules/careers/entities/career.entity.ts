import { IndustryEntity } from '@/modules/companies/entities/industry.entity';
import { AbstractEntity } from '@common/abstract.entity';
import { Column, Entity, ManyToOne } from 'typeorm';

@Entity()
export class CareerEntity extends AbstractEntity {
  @Column()
  name: string;

  @ManyToOne(() => CareerEntity, {
    nullable: true,
  })
  parent?: CareerEntity;

  @ManyToOne(() => IndustryEntity, {
    nullable: true,
  })
  industry: IndustryEntity;
}
