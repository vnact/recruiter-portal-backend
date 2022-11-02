import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddUserField1667367487002 implements MigrationInterface {
  name = 'AddUserField1667367487002';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE "user_career" (
                "users_id" integer NOT NULL,
                "careers_id" integer NOT NULL,
                CONSTRAINT "PK_b249d4a40f8f5301cf433a5153b" PRIMARY KEY ("users_id", "careers_id")
            )
        `);
    await queryRunner.query(`
            CREATE INDEX "IDX_77cd2414985dedb46fd37e4700" ON "user_career" ("users_id")
        `);
    await queryRunner.query(`
            CREATE INDEX "IDX_134cb9f823df4b95459a118f6c" ON "user_career" ("careers_id")
        `);
    await queryRunner.query(`
            ALTER TABLE "users"
            ADD "employment_type" character varying array NULL
        `);
    await queryRunner.query(`
            ALTER TABLE "user_career"
            ADD CONSTRAINT "FK_77cd2414985dedb46fd37e4700f" FOREIGN KEY ("users_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE
        `);
    await queryRunner.query(`
            ALTER TABLE "user_career"
            ADD CONSTRAINT "FK_134cb9f823df4b95459a118f6ce" FOREIGN KEY ("careers_id") REFERENCES "careers"("id") ON DELETE CASCADE ON UPDATE CASCADE
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "user_career" DROP CONSTRAINT "FK_134cb9f823df4b95459a118f6ce"
        `);
    await queryRunner.query(`
            ALTER TABLE "user_career" DROP CONSTRAINT "FK_77cd2414985dedb46fd37e4700f"
        `);
    await queryRunner.query(`
            ALTER TABLE "users" DROP COLUMN "employment_type"
        `);
    await queryRunner.query(`
            DROP INDEX "public"."IDX_134cb9f823df4b95459a118f6c"
        `);
    await queryRunner.query(`
            DROP INDEX "public"."IDX_77cd2414985dedb46fd37e4700"
        `);
    await queryRunner.query(`
            DROP TABLE "user_career"
        `);
  }
}
