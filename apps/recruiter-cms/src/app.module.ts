import { ApplyModule } from '@modules/apply/apply.module';
import { AuthModule } from '@modules/auth/auth.module';
import { CareerModule } from '@modules/careers/career.module';
import { CompanyModule } from '@modules/companies/company.module';
import { EducationModule } from '@modules/education/educetion.module';
import { ExperienceModule } from '@modules/experience/experience.module';
import { JobLikeModule } from '@modules/joblike/joblike.module';
import { JobModule } from '@modules/jobs/job.module';
import { SkillModule } from '@modules/skills/skill.module';
import { UserModule } from '@modules/users/user.module';
import { UUIDModule } from '@modules/uuid/uuid.module';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ormConfig } from './configs/orm.config';
import { FrontendModule } from './modules/frontend/frontend.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      ignoreEnvFile: process.env.NODE_ENV === 'production',
      load: [ormConfig],
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => config.get('database'),
    }),
    UUIDModule,
    FrontendModule,
    AuthModule,
    UserModule,
    JobModule,
    SkillModule,
    ExperienceModule,
    CareerModule,
    CompanyModule,
    EducationModule,
    ApplyModule,
    JobLikeModule,
  ],
})
export class AppModule {}
