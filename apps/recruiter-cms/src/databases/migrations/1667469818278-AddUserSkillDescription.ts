import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddUserSkillDescription1667469818278
  implements MigrationInterface
{
  name = 'AddUserSkillDescription1667469818278';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "user_skill"
            ADD "description" text
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "user_skill" DROP COLUMN "description"
        `);
  }
}
