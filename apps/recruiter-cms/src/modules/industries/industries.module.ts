import { IndustryRepository } from '@modules/companies/repositories/industry.repository';
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmExModule } from '@shared/typeorm-ex.module';
import { IndustryController } from './controllers/industry.controller';
import { IndustryQueryHandlers } from './queries';

@Module({
  imports: [
    TypeOrmExModule.forCustomRepository([IndustryRepository]),
    CqrsModule,
  ],
  controllers: [IndustryController],
  providers: [...IndustryQueryHandlers],
})
export class IndustriesModule {}
