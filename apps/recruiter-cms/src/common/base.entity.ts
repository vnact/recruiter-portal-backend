import { Exclude } from 'class-transformer';
import { Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

export class BaseEntity {
  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column({ nullable: true })
  createdById?: number;

  @Column({ nullable: true })
  updatedById?: number;

  @Exclude()
  get elasticsearchBody() {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    let doc: any = this;
    if (doc.gpsLat && doc.gpsLng) {
      const { gpsLat, gpsLng, ...other } = doc;
      doc = {
        ...other,
        pin: {
          location: {
            lat: gpsLat,
            lon: gpsLng,
          },
        },
      };
    }
    return doc;
  }

  constructor(partial?: BaseEntity) {
    Object.assign(this, partial);
  }
}
