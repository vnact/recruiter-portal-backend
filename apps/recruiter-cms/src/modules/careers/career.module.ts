import { Module } from '@nestjs/common';
import { TypeOrmExModule } from '@shared/typeorm-ex.module';
import { CareerQueryHandlers } from './queries';
import { CareerRepository } from './repositories/career.repository';

@Module({
  imports: [TypeOrmExModule.forCustomRepository([CareerRepository])],
  controllers: [],
  providers: [...CareerQueryHandlers],
})
export class CareerModule {}
