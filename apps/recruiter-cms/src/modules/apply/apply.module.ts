import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmExModule } from '@shared/typeorm-ex.module';
import { ApplyCommandHandlers } from './commands';
import { ApplyController } from './controllers/apply.controller';
import { ApplyQueryHandlers } from './queries';
import { ApplyRepository } from './repositories/apply.repository';

@Module({
  imports: [TypeOrmExModule.forCustomRepository([ApplyRepository]), CqrsModule],
  controllers: [ApplyController],
  providers: [...ApplyQueryHandlers, ...ApplyCommandHandlers],
})
export class ApplyModule {}
