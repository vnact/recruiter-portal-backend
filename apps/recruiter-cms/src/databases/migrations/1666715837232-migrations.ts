import { MigrationInterface, QueryRunner } from 'typeorm';

export class migrations1666715837232 implements MigrationInterface {
  name = 'migrations1666715837232';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "job_skill" DROP CONSTRAINT "FK_57d07c4be198a93a91fa8479819"
        `);
    await queryRunner.query(`
            CREATE TABLE "joblikes" (
                "created_at" TIMESTAMP NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
                "created_by_id" integer,
                "updated_by_id" integer,
                "id" SERIAL NOT NULL,
                "job_id" integer NOT NULL,
                "user_id" integer NOT NULL,
                CONSTRAINT "PK_c1671c027626d4443cb54d0dee5" PRIMARY KEY ("id")
            )
        `);
    await queryRunner.query(`
            ALTER TABLE "users"
            ALTER COLUMN "birth_day" DROP NOT NULL
        `);
    await queryRunner.query(`
            ALTER TABLE "joblikes"
            ADD CONSTRAINT "FK_8ec8ad14e0a80a95df6044609c1" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    await queryRunner.query(`
            ALTER TABLE "joblikes"
            ADD CONSTRAINT "FK_e301527cab89ced50dbc435f6da" FOREIGN KEY ("job_id") REFERENCES "jobs"("id") ON DELETE CASCADE ON UPDATE NO ACTION
        `);
    await queryRunner.query(`
            ALTER TABLE "job_skill"
            ADD CONSTRAINT "FK_57d07c4be198a93a91fa8479819" FOREIGN KEY ("job_id") REFERENCES "jobs"("id") ON DELETE CASCADE ON UPDATE NO ACTION
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "job_skill" DROP CONSTRAINT "FK_57d07c4be198a93a91fa8479819"
        `);
    await queryRunner.query(`
            ALTER TABLE "joblikes" DROP CONSTRAINT "FK_e301527cab89ced50dbc435f6da"
        `);
    await queryRunner.query(`
            ALTER TABLE "joblikes" DROP CONSTRAINT "FK_8ec8ad14e0a80a95df6044609c1"
        `);
    await queryRunner.query(`
            ALTER TABLE "users"
            ALTER COLUMN "birth_day"
            SET NOT NULL
        `);
    await queryRunner.query(`
            DROP TABLE "joblikes"
        `);
    await queryRunner.query(`
            ALTER TABLE "job_skill"
            ADD CONSTRAINT "FK_57d07c4be198a93a91fa8479819" FOREIGN KEY ("job_id") REFERENCES "jobs"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
  }
}
