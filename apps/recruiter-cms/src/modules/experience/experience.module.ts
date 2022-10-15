import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmExModule } from '@shared/typeorm-ex.module';
import { ExperienceCommandHandlers } from './commands';
import { ExperienceController } from './controllers/experience.controller';
import { ExperienceRepository } from './repositories/experience.repository';

@Module({
  providers: [...ExperienceCommandHandlers],
  imports: [
    TypeOrmExModule.forCustomRepository([ExperienceRepository]),
    CqrsModule,
  ],
  controllers: [ExperienceController],
})
export class ExperienceModule {}
