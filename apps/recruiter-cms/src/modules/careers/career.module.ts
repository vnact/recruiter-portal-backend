import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmExModule } from '@shared/typeorm-ex.module';
import { CareerController } from './controllers/career.controller';
import { CareerQueryHandlers } from './queries';
import { CareerRepository } from './repositories/career.repository';

@Module({
  imports: [
    TypeOrmExModule.forCustomRepository([CareerRepository]),
    CqrsModule,
  ],
  controllers: [CareerController],
  providers: [...CareerQueryHandlers],
})
export class CareerModule {}
