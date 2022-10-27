import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddFavoriteJob1666882407784 implements MigrationInterface {
  name = 'AddFavoriteJob1666882407784';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "job_skill" DROP CONSTRAINT "FK_57d07c4be198a93a91fa8479819"
        `);
    await queryRunner.query(`
            CREATE TABLE "favorite_job" (
                "created_at" TIMESTAMP NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
                "created_by_id" integer,
                "updated_by_id" integer,
                "id" SERIAL NOT NULL,
                "job_id" integer NOT NULL,
                "user_id" integer NOT NULL,
                CONSTRAINT "PK_313bd4ea59bf8fcd41af0ea2f7e" PRIMARY KEY ("id")
            )
        `);
    await queryRunner.query(`
            ALTER TABLE "job_skill"
            ADD CONSTRAINT "FK_57d07c4be198a93a91fa8479819" FOREIGN KEY ("job_id") REFERENCES "jobs"("id") ON DELETE CASCADE ON UPDATE NO ACTION
        `);
    await queryRunner.query(`
            ALTER TABLE "favorite_job"
            ADD CONSTRAINT "FK_d3463787e0e822499fb386effd2" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    await queryRunner.query(`
            ALTER TABLE "favorite_job"
            ADD CONSTRAINT "FK_509037d95c01b03dabd380c45ae" FOREIGN KEY ("job_id") REFERENCES "jobs"("id") ON DELETE CASCADE ON UPDATE NO ACTION
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "favorite_job" DROP CONSTRAINT "FK_509037d95c01b03dabd380c45ae"
        `);
    await queryRunner.query(`
            ALTER TABLE "favorite_job" DROP CONSTRAINT "FK_d3463787e0e822499fb386effd2"
        `);
    await queryRunner.query(`
            ALTER TABLE "job_skill" DROP CONSTRAINT "FK_57d07c4be198a93a91fa8479819"
        `);
    await queryRunner.query(`
            DROP TABLE "favorite_job"
        `);
    await queryRunner.query(`
            ALTER TABLE "job_skill"
            ADD CONSTRAINT "FK_57d07c4be198a93a91fa8479819" FOREIGN KEY ("job_id") REFERENCES "jobs"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
  }
}
