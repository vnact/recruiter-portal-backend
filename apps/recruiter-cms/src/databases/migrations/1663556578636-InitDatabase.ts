import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitDatabase1663556578636 implements MigrationInterface {
  name = 'InitDatabase1663556578636';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE "industries" (
                "created_at" TIMESTAMP NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
                "created_by_id" integer,
                "updated_by_id" integer,
                "id" SERIAL NOT NULL,
                "name" character varying NOT NULL,
                CONSTRAINT "PK_f1626dcb2d58142d7dfcca7b8d1" PRIMARY KEY ("id")
            )
        `);
    await queryRunner.query(`
            CREATE TABLE "career_entity" (
                "created_at" TIMESTAMP NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
                "created_by_id" integer,
                "updated_by_id" integer,
                "id" SERIAL NOT NULL,
                "name" character varying NOT NULL,
                "parent_id" integer,
                "industry_id" integer,
                CONSTRAINT "PK_57a772065a9ebbad8e667326d00" PRIMARY KEY ("id")
            )
        `);
    await queryRunner.query(`
            CREATE TABLE "education" (
                "created_at" TIMESTAMP NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
                "created_by_id" integer,
                "updated_by_id" integer,
                "id" SERIAL NOT NULL,
                "school" character varying NOT NULL,
                "degree" character varying,
                "field_of_study" character varying,
                "is_completed" boolean NOT NULL DEFAULT false,
                "start_time" date NOT NULL,
                "end_time" date,
                "grade" TIMESTAMP,
                "description" text,
                "user_id" integer,
                CONSTRAINT "PK_bf3d38701b3030a8ad634d43bd6" PRIMARY KEY ("id")
            )
        `);
    await queryRunner.query(`
            CREATE TABLE "experience" (
                "created_at" TIMESTAMP NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
                "created_by_id" integer,
                "updated_by_id" integer,
                "id" SERIAL NOT NULL,
                "title" character varying,
                "company_name" character varying,
                "employment_type" character varying NOT NULL,
                "start_date" date NOT NULL,
                "end_date" date,
                "description" text,
                "user_id" integer,
                "career_id" integer,
                "company_id" integer,
                CONSTRAINT "PK_5e8d5a534100e1b17ee2efa429a" PRIMARY KEY ("id")
            )
        `);
    await queryRunner.query(`
            CREATE TABLE "skills" (
                "created_at" TIMESTAMP NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
                "created_by_id" integer,
                "updated_by_id" integer,
                "id" SERIAL NOT NULL,
                "name" character varying NOT NULL,
                "description" character varying,
                CONSTRAINT "PK_0d3212120f4ecedf90864d7e298" PRIMARY KEY ("id")
            )
        `);
    await queryRunner.query(`
            CREATE TABLE "users" (
                "created_at" TIMESTAMP NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
                "created_by_id" integer,
                "updated_by_id" integer,
                "id" SERIAL NOT NULL,
                "email" character varying NOT NULL,
                "uid" character varying NOT NULL,
                "gender" character varying NOT NULL DEFAULT 'other',
                "birth_day" date NOT NULL,
                "height" double precision,
                "weight" double precision,
                "level" character varying DEFAULT 'no_exp',
                "high_school" character varying,
                "family_register_number" character varying,
                "identity_card_number" character varying,
                "hobby" character varying,
                "character" character varying,
                "place_of_origin" character varying,
                "description" text,
                CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id")
            )
        `);
    await queryRunner.query(`
            CREATE UNIQUE INDEX "IDX_97672ac88f789774dd47f7c8be" ON "users" ("email")
        `);
    await queryRunner.query(`
            CREATE UNIQUE INDEX "IDX_6e20ce1edf0678a09f1963f958" ON "users" ("uid")
        `);
    await queryRunner.query(`
            CREATE TABLE "jobs" (
                "created_at" TIMESTAMP NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
                "created_by_id" integer,
                "updated_by_id" integer,
                "id" SERIAL NOT NULL,
                "title" character varying NOT NULL,
                "description" character varying,
                "location" character varying NOT NULL,
                "gps_lat" double precision NOT NULL,
                "gps_lng" double precision NOT NULL,
                "gender" character varying array NOT NULL,
                "min_salary" integer,
                "max_salary" integer,
                "start_date" date NOT NULL,
                "end_date" date,
                "employment_type" character varying array NOT NULL,
                "workplaces" character varying array NOT NULL,
                "applies" smallint NOT NULL DEFAULT '0',
                "recruits" smallint NOT NULL DEFAULT '0',
                "company_id" integer,
                "recruiter_id" integer,
                CONSTRAINT "PK_cf0a6c42b72fcc7f7c237def345" PRIMARY KEY ("id")
            )
        `);
    await queryRunner.query(`
            CREATE TABLE "companies" (
                "created_at" TIMESTAMP NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
                "created_by_id" integer,
                "updated_by_id" integer,
                "id" SERIAL NOT NULL,
                "name" character varying NOT NULL,
                "phone" character varying NOT NULL,
                "email" character varying NOT NULL,
                "tax_number" character varying NOT NULL,
                "website" character varying,
                "size" character varying DEFAULT 'one_plus',
                "description" text,
                "address" character varying,
                "gps_lat" double precision NOT NULL,
                "gps_lng" double precision NOT NULL,
                "province_id" integer NOT NULL,
                "industry_id" integer,
                CONSTRAINT "PK_d4bc3e82a314fa9e29f652c2c22" PRIMARY KEY ("id")
            )
        `);
    await queryRunner.query(`
            CREATE TABLE "user_skill" (
                "users_id" integer NOT NULL,
                "skills_id" integer NOT NULL,
                CONSTRAINT "PK_413b2cf9414e705717768c9b526" PRIMARY KEY ("users_id", "skills_id")
            )
        `);
    await queryRunner.query(`
            CREATE INDEX "IDX_6fa23c36da45b4b916567de9c9" ON "user_skill" ("users_id")
        `);
    await queryRunner.query(`
            CREATE INDEX "IDX_809eea5fccf58fa9455039adaf" ON "user_skill" ("skills_id")
        `);
    await queryRunner.query(`
            ALTER TABLE "career_entity"
            ADD CONSTRAINT "FK_65b22c637f748b3c47dd9e4d2c4" FOREIGN KEY ("parent_id") REFERENCES "career_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    await queryRunner.query(`
            ALTER TABLE "career_entity"
            ADD CONSTRAINT "FK_739479d9e21a8c5776e27f8e0b6" FOREIGN KEY ("industry_id") REFERENCES "industries"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    await queryRunner.query(`
            ALTER TABLE "education"
            ADD CONSTRAINT "FK_5bfcef10ecdda36d2ee68aa2049" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    await queryRunner.query(`
            ALTER TABLE "experience"
            ADD CONSTRAINT "FK_62c0623650986849f3fc1d148e7" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    await queryRunner.query(`
            ALTER TABLE "experience"
            ADD CONSTRAINT "FK_2ae21e736cd85cccd1d306ecf5d" FOREIGN KEY ("career_id") REFERENCES "career_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    await queryRunner.query(`
            ALTER TABLE "experience"
            ADD CONSTRAINT "FK_011d798b3d01be4d6ee741759de" FOREIGN KEY ("company_id") REFERENCES "companies"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    await queryRunner.query(`
            ALTER TABLE "jobs"
            ADD CONSTRAINT "FK_087a773c50525e348e26188e7cc" FOREIGN KEY ("company_id") REFERENCES "companies"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    await queryRunner.query(`
            ALTER TABLE "jobs"
            ADD CONSTRAINT "FK_4aa9e89c9fdf42566a1978820a6" FOREIGN KEY ("recruiter_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    await queryRunner.query(`
            ALTER TABLE "companies"
            ADD CONSTRAINT "FK_a9ea9f740765b888dbb4055bc9a" FOREIGN KEY ("industry_id") REFERENCES "industries"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    await queryRunner.query(`
            ALTER TABLE "user_skill"
            ADD CONSTRAINT "FK_6fa23c36da45b4b916567de9c96" FOREIGN KEY ("users_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE
        `);
    await queryRunner.query(`
            ALTER TABLE "user_skill"
            ADD CONSTRAINT "FK_809eea5fccf58fa9455039adaf1" FOREIGN KEY ("skills_id") REFERENCES "skills"("id") ON DELETE CASCADE ON UPDATE CASCADE
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "user_skill" DROP CONSTRAINT "FK_809eea5fccf58fa9455039adaf1"
        `);
    await queryRunner.query(`
            ALTER TABLE "user_skill" DROP CONSTRAINT "FK_6fa23c36da45b4b916567de9c96"
        `);
    await queryRunner.query(`
            ALTER TABLE "companies" DROP CONSTRAINT "FK_a9ea9f740765b888dbb4055bc9a"
        `);
    await queryRunner.query(`
            ALTER TABLE "jobs" DROP CONSTRAINT "FK_4aa9e89c9fdf42566a1978820a6"
        `);
    await queryRunner.query(`
            ALTER TABLE "jobs" DROP CONSTRAINT "FK_087a773c50525e348e26188e7cc"
        `);
    await queryRunner.query(`
            ALTER TABLE "experience" DROP CONSTRAINT "FK_011d798b3d01be4d6ee741759de"
        `);
    await queryRunner.query(`
            ALTER TABLE "experience" DROP CONSTRAINT "FK_2ae21e736cd85cccd1d306ecf5d"
        `);
    await queryRunner.query(`
            ALTER TABLE "experience" DROP CONSTRAINT "FK_62c0623650986849f3fc1d148e7"
        `);
    await queryRunner.query(`
            ALTER TABLE "education" DROP CONSTRAINT "FK_5bfcef10ecdda36d2ee68aa2049"
        `);
    await queryRunner.query(`
            ALTER TABLE "career_entity" DROP CONSTRAINT "FK_739479d9e21a8c5776e27f8e0b6"
        `);
    await queryRunner.query(`
            ALTER TABLE "career_entity" DROP CONSTRAINT "FK_65b22c637f748b3c47dd9e4d2c4"
        `);
    await queryRunner.query(`
            DROP INDEX "public"."IDX_809eea5fccf58fa9455039adaf"
        `);
    await queryRunner.query(`
            DROP INDEX "public"."IDX_6fa23c36da45b4b916567de9c9"
        `);
    await queryRunner.query(`
            DROP TABLE "user_skill"
        `);
    await queryRunner.query(`
            DROP TABLE "companies"
        `);
    await queryRunner.query(`
            DROP TABLE "jobs"
        `);
    await queryRunner.query(`
            DROP INDEX "public"."IDX_6e20ce1edf0678a09f1963f958"
        `);
    await queryRunner.query(`
            DROP INDEX "public"."IDX_97672ac88f789774dd47f7c8be"
        `);
    await queryRunner.query(`
            DROP TABLE "users"
        `);
    await queryRunner.query(`
            DROP TABLE "skills"
        `);
    await queryRunner.query(`
            DROP TABLE "experience"
        `);
    await queryRunner.query(`
            DROP TABLE "education"
        `);
    await queryRunner.query(`
            DROP TABLE "career_entity"
        `);
    await queryRunner.query(`
            DROP TABLE "industries"
        `);
  }
}
