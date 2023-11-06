import { AbstractEntity } from '@common/abstract.entity';
import { Column, Entity } from 'typeorm';

@Entity('industries')
export class IndustryEntity extends AbstractEntity {
  @Column('varchar')
  name: string;
}
