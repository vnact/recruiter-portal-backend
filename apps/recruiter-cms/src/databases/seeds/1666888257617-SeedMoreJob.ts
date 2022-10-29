import {
  EmploymentType,
  ExpLevel,
  UserRole,
  Workplace,
} from 'src/constants/enum';
import { UtilService } from '@providers/utils.service';
import { CareerEntity } from '@modules/careers/entities/career.entity';
import { JobEntity } from '@modules/jobs/entities/job.entity';
import { UserEntity } from '@modules/users/entities/user.entity';
import { MigrationInterface, QueryRunner } from 'typeorm';
import { faker } from '@faker-js/faker';
import { CompanyEntity } from '@modules/companies/entities/company.entity';
import { SkillEntity } from '@modules/skills/entities/skill.entity';
import { JobSkillEntity } from '@modules/jobs/entities/job-skill.entity';
import { In, DeepPartial } from 'typeorm';

export class SeedMoreJob1666888257617 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const recruiters = await queryRunner.manager.find(UserEntity, {
      where: {
        role: In([UserRole.Admin, UserRole.Recruiter]),
      },
    });
    const careers = await queryRunner.manager.find(CareerEntity, {
      relations: ['parent', 'industry'],
    });
    const companies = await queryRunner.manager.find(CompanyEntity, {
      relations: {
        industry: true,
      },
    });
    const skills = await queryRunner.manager.find(SkillEntity);
    const employmentTypes = [
      EmploymentType.Apprenticeship,
      EmploymentType.Contract,
      EmploymentType.Freelance,
      EmploymentType.FullTime,
      EmploymentType.Internship,
      EmploymentType.PartTime,
      EmploymentType.Seasonal,
      EmploymentType.SelfEmployed,
    ];
    const levels = [
      ExpLevel.NoExp,
      ExpLevel.LessThanOne,
      ExpLevel.OnePlus,
      ExpLevel.TwoPlus,
      ExpLevel.ThreePlus,
      ExpLevel.FourPlus,
      ExpLevel.FivePlus,
    ];
    const workplaces = [Workplace.Hybrid, Workplace.OnSite, Workplace.Remote];

    const locations = [
      [21.13736, 105.65425, 20.791117, 106.049758, 'Ha Noi'],
      [16.176981, 107.873424, 15.967162, 108.141216, 'Da Nang'],
      [10.897931, 106.535839, 10.736065, 106.701321, 'TP Ho Chi Minh'],
    ] as [number, number, number, number, string][];

    for (let i = 0; i < 200; i++) {
      const minSalary = UtilService.getRandom(0, 2000);
      const maxSalary = UtilService.getRandom(minSalary, 3000);
      const [maxLat, minLng, minLat, maxLng, location] =
        UtilService.pickOne(locations);
      const jobData: DeepPartial<JobEntity> = {
        applies: 0,
        apply: [],
        career: UtilService.pickOne(careers),
        gpsLat: UtilService.getRandomInRange(minLat, maxLat, 7),
        gpsLng: UtilService.getRandomInRange(minLng, maxLng, 7),
        company: UtilService.pickOne(companies),
        employmentType: UtilService.pickMany(
          employmentTypes,
          UtilService.getRandom(0, 3),
        ),
        gender: [],
        level: UtilService.pickOne(levels),
        recruiter: UtilService.pickOne(recruiters),
        title: faker.name.jobTitle(),
        description: faker.lorem.paragraphs(UtilService.getRandom(3, 5)),
        startDate: new Date(),
        location,
        minSalary,
        maxSalary,
        workplaces: UtilService.pickMany(workplaces),
      };
      const job = await queryRunner.manager.save(JobEntity, jobData);
      const randomSkills = UtilService.pickMany(skills, 3);
      await queryRunner.manager.insert(
        JobSkillEntity,
        randomSkills.map((skill) => ({
          jobId: job.id,
          skillId: skill.id,
        })),
      );
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    //
  }
}
