import { MigrationInterface, QueryRunner } from 'typeorm';

export class migrations1666535950856 implements MigrationInterface {
  name = 'migrations1666535950856';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE "apply" (
                "created_at" TIMESTAMP NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
                "created_by_id" integer,
                "updated_by_id" integer,
                "id" SERIAL NOT NULL,
                "job_id" integer NOT NULL,
                "user_id" integer NOT NULL,
                CONSTRAINT "PK_c61ed680472aa0f58499175d902" PRIMARY KEY ("id")
            )
        `);
    await queryRunner.query(`
            ALTER TABLE "job_skill"
            ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()
        `);
    await queryRunner.query(`
            ALTER TABLE "job_skill"
            ADD "updated_at" TIMESTAMP NOT NULL DEFAULT now()
        `);
    await queryRunner.query(`
            ALTER TABLE "job_skill"
            ADD "created_by_id" integer
        `);
    await queryRunner.query(`
            ALTER TABLE "job_skill"
            ADD "updated_by_id" integer
        `);
    await queryRunner.query(`
            ALTER TABLE "job_skill"
            ADD "id" SERIAL NOT NULL
        `);
    await queryRunner.query(`
            ALTER TABLE "job_skill" DROP CONSTRAINT "PK_119a6ffc60b3ce0973262b3a742"
        `);
    await queryRunner.query(`
            ALTER TABLE "job_skill"
            ADD CONSTRAINT "PK_759e9e4566cc29f23d535698bab" PRIMARY KEY ("job_id", "skill_id", "id")
        `);
    await queryRunner.query(`
            ALTER TABLE "education" DROP COLUMN "grade"
        `);
    await queryRunner.query(`
            ALTER TABLE "education"
            ADD "grade" character varying
        `);
    await queryRunner.query(`
            ALTER TABLE "jobs"
            ALTER COLUMN "level"
            SET NOT NULL
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "jobs"
            ALTER COLUMN "level" DROP NOT NULL
        `);
    await queryRunner.query(`
            ALTER TABLE "education" DROP COLUMN "grade"
        `);
    await queryRunner.query(`
            ALTER TABLE "education"
            ADD "grade" TIMESTAMP
        `);
    await queryRunner.query(`
            ALTER TABLE "job_skill" DROP CONSTRAINT "PK_759e9e4566cc29f23d535698bab"
        `);
    await queryRunner.query(`
            ALTER TABLE "job_skill"
            ADD CONSTRAINT "PK_119a6ffc60b3ce0973262b3a742" PRIMARY KEY ("job_id", "skill_id")
        `);
    await queryRunner.query(`
            ALTER TABLE "job_skill" DROP COLUMN "id"
        `);
    await queryRunner.query(`
            ALTER TABLE "job_skill" DROP COLUMN "updated_by_id"
        `);
    await queryRunner.query(`
            ALTER TABLE "job_skill" DROP COLUMN "created_by_id"
        `);
    await queryRunner.query(`
            ALTER TABLE "job_skill" DROP COLUMN "updated_at"
        `);
    await queryRunner.query(`
            ALTER TABLE "job_skill" DROP COLUMN "created_at"
        `);
    await queryRunner.query(`
            DROP TABLE "apply"
        `);
  }
}
