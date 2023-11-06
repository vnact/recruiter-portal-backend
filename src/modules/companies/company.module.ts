import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmExModule } from '@shared/typeorm-ex.module';
import { CompanyQueryHandles } from './queries';
import { CompanyRepository } from './repositories/company.repository';
import { CompanyController } from './controllers/company.controller';

@Module({
  providers: [...CompanyQueryHandles],
  imports: [
    TypeOrmExModule.forCustomRepository([CompanyRepository]),
    CqrsModule,
  ],
  controllers: [CompanyController],
})
export class CompanyModule {}
