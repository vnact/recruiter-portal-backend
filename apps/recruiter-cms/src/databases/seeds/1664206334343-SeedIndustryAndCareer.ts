import { MigrationInterface, QueryRunner, In } from 'typeorm';
import { IndustryEntity } from '@modules/companies/entities/industry.entity';
import { pLimit } from '@providers/plimit.service';
import { CareerEntity } from '@modules/careers/entities/career.entity';

export interface CareerList {
  name: string;
  subItems: CareerList[];
}

export interface IndustryList {
  name: string;
  careers: CareerList[];
}

const industries: IndustryList[] = [
  {
    name: 'Information Technology',
    careers: [
      { name: 'Software Engineer', subItems: [] },
      { name: 'Software Developer', subItems: [] },
      {
        name: 'Web Developer',
        subItems: [
          {
            name: 'Backend Developer',
            subItems: [],
          },
          { name: 'Frontend Developer', subItems: [] },
          { name: 'Fullstack Developer', subItems: [] },
        ],
      },
      {
        name: 'QC/QA',
        subItems: [
          {
            name: 'Tester',
            subItems: [],
          },
          {
            name: 'Automation Tester',
            subItems: [],
          },
          {
            name: 'Quality Assurance',
            subItems: [],
          },
          {
            name: 'Quality Control',
            subItems: [],
          },
        ],
      },
    ],
  },
  {
    name: 'Human Resources',
    careers: [
      {
        name: 'Recruiter',
        subItems: [
          { name: 'Human Resources Specialist', subItems: [] },
          { name: 'Talent Acquisition Specialist', subItems: [] },
          { name: 'Human Resources Assistant', subItems: [] },
          { name: 'Human Resources Administrator', subItems: [] },
          { name: 'Talent Acquisition Supervisor', subItems: [] },
        ],
      },
      { name: 'Teaching Assistant', subItems: [] },
      { name: 'Administrator', subItems: [] },
    ],
  },
  {
    name: 'Officer',
    careers: [
      { name: 'Owner', subItems: [] },
      { name: 'Administrator', subItems: [] },
      { name: 'Chief Executive Officer', subItems: [] },
    ],
  },
  {
    name: 'E-commerce',
    careers: [
      {
        name: 'Handing Out Flyers',
        subItems: [],
      },
      {
        name: 'Online Sales Manager',
        subItems: [],
      },
      {
        name: 'E-commerce Executive',
        subItems: [],
      },
      {
        name: 'Project Manager (E-commerce)',
        subItems: [],
      },
    ],
  },
];

export class SeedIndustryAndCareer1664206334343 implements MigrationInterface {
  name = 'SeedIndustryAndCareer1664206334343';

  public async up(queryRunner: QueryRunner): Promise<void> {
    const insertCareers = async (
      career: CareerList,
      industry: IndustryEntity,
      parent?: CareerEntity,
    ) => {
      const careerInfo = await queryRunner.manager.save(
        queryRunner.manager.create(CareerEntity, {
          industry,
          name: career.name,
          parent,
        }),
      );
      const limit = pLimit(2);
      await Promise.all(
        career.subItems.map((c) =>
          limit(() => insertCareers(c, industry, careerInfo)),
        ),
      );
    };

    for (const _industry of industries) {
      const industry = await queryRunner.manager.save(
        queryRunner.manager.create(IndustryEntity, {
          name: _industry.name,
        }),
      );
      await Promise.all(
        _industry.careers.map((career) => insertCareers(career, industry)),
      );
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const careers = industries.flatMap((e) =>
      e.careers.flatMap((c) => [
        c.name,
        ...c.subItems.flatMap((cs) => cs.name),
      ]),
    );
    await queryRunner.manager.update(
      CareerEntity,
      {
        name: In(careers),
      },
      {
        parent: null,
      },
    );
    await queryRunner.manager.delete(CareerEntity, {
      name: In(careers),
    });
    await queryRunner.manager.delete(IndustryEntity, {
      name: In(industries.map((e) => e.name)),
    });
  }
}
