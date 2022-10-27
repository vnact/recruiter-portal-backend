import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmExModule } from '@shared/typeorm-ex.module';
import { FavoriteJobCommandHandlers } from './commands';
import { FavoriteJobController } from './controllers/favorite-job.controller';
import { FavoriteJobQueryHandlers } from './queries';
import { FavoriteJobRepository } from './repositories/favorite-job.repository';

@Module({
  imports: [
    TypeOrmExModule.forCustomRepository([FavoriteJobRepository]),
    CqrsModule,
  ],
  controllers: [FavoriteJobController],
  providers: [...FavoriteJobCommandHandlers, ...FavoriteJobQueryHandlers],
})
export class FavoriteJobModule {}
