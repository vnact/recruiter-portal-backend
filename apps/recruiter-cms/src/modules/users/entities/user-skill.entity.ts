import { SkillEntity } from '@modules/skills/entities/skill.entity';
import { Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm';
import { UserEntity } from './user.entity';

@Entity('user_skill')
export class UserSkillEntity {
  @ManyToOne(() => UserEntity)
  user: UserEntity;

  @PrimaryColumn()
  userId: number;

  @ManyToOne(() => SkillEntity)
  skill: UserEntity;

  @PrimaryColumn()
  skillId: number;

  @Column('text', {
    nullable: true,
  })
  certificate: string;
}
