import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddUserPhone1667466746695 implements MigrationInterface {
  name = 'AddUserPhone1667466746695';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "users"
            ADD "phone_number" character varying
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "users" DROP COLUMN "phone_number"
        `);
  }
}
