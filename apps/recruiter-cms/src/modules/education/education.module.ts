import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmExModule } from '@shared/typeorm-ex.module';
import { EducationCommandHandlers } from './commands';
import { EducationController } from './controllers/education.controller';
import { EducationQueryHandlers } from './queries';
import { EducationRepository } from './repositories/education.repository';

@Module({
  imports: [
    TypeOrmExModule.forCustomRepository([EducationRepository]),
    CqrsModule,
  ],
  controllers: [EducationController],
  providers: [...EducationCommandHandlers, ...EducationQueryHandlers],
})
export class EducationModule {}
