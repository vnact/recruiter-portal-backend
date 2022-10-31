import { ApplyModule } from '@modules/apply/apply.module';
import { AuthModule } from '@modules/auth/auth.module';
import { CareerModule } from '@modules/careers/career.module';
import { CompanyModule } from '@modules/companies/company.module';
import { EducationModule } from '@modules/education/education.module';
import { ExperienceModule } from '@modules/experience/experience.module';
import { FavoriteJobModule } from '@modules/favorite/favorite-job.module';
import { JobModule } from '@modules/jobs/job.module';
import { SkillModule } from '@modules/skills/skill.module';
import { UserModule } from '@modules/users/user.module';
import { UUIDModule } from '@modules/uuid/uuid.module';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ormConfig } from './configs/orm.config';
import { FrontendModule } from './modules/frontend/frontend.module';
import { ScheduleModule } from '@nestjs/schedule';
import { CronModule } from '@modules/cron/cron.module';
import { ElasticSearchModule } from '@modules/elasticsearch/elasticsearch.module';
import { IndustriesModule } from './modules/industries/industries.module';
import { AppController } from './app.controller';

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
    ScheduleModule.forRoot(),
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
    FavoriteJobModule,
    CronModule,
    ElasticSearchModule,
    IndustriesModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
