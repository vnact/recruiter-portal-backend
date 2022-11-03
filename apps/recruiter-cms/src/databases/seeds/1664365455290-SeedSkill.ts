import { SkillEntity } from '@modules/skills/entities/skill.entity';
import { In, MigrationInterface, QueryRunner } from 'typeorm';

const skills: string[] = [
  'Linux',
  'SQL',
  'HTML',
  'Javascript',
  'CSS',
  'Go (Programming Language)',
  'PHP',
  'Python',
  'Talent Management',
  'English',
  'AngularJS',
  'NoSQL',
];

export class SeedSkill1664365455290 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await Promise.all(
      skills.map((jobName) =>
        queryRunner.manager.insert(SkillEntity, { name: jobName }),
      ),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.manager.delete(SkillEntity, {
      name: In(skills),
    });
  }
}
