import { MigrationInterface, QueryRunner } from 'typeorm';

export class migrations1666622730621 implements MigrationInterface {
  name = 'migrations1666622730621';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "apply" DROP CONSTRAINT "FK_b147ed7124d95677913d58f9525"
        `);
    await queryRunner.query(`
            ALTER TABLE "apply" DROP CONSTRAINT "FK_2834b82cb411d4b3772cb7202e2"
        `);
    await queryRunner.query(`
            ALTER TABLE "apply"
            ADD CONSTRAINT "FK_b147ed7124d95677913d58f9525" FOREIGN KEY ("job_id") REFERENCES "jobs"("id") ON DELETE CASCADE ON UPDATE NO ACTION
        `);
    await queryRunner.query(`
            ALTER TABLE "apply"
            ADD CONSTRAINT "FK_2834b82cb411d4b3772cb7202e2" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "apply" DROP CONSTRAINT "FK_2834b82cb411d4b3772cb7202e2"
        `);
    await queryRunner.query(`
            ALTER TABLE "apply" DROP CONSTRAINT "FK_b147ed7124d95677913d58f9525"
        `);
    await queryRunner.query(`
            ALTER TABLE "apply"
            ADD CONSTRAINT "FK_2834b82cb411d4b3772cb7202e2" FOREIGN KEY ("user_id") REFERENCES "apply"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    await queryRunner.query(`
            ALTER TABLE "apply"
            ADD CONSTRAINT "FK_b147ed7124d95677913d58f9525" FOREIGN KEY ("job_id") REFERENCES "apply"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
  }
}
