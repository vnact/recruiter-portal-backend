import { Module, OnModuleInit } from '@nestjs/common';
import { CronCommandHandlers } from './commands';
import { CronQueryHandlers } from './queries';
import { GetCurrentUpdatedService } from './services/get-current-updated.service';
import { typeormConfig } from '../../ormconfig';
import { DataSource } from 'typeorm';
import { CqrsModule } from '@nestjs/cqrs';
import { CronController } from './controller/cron.controller';

const dataSource = new DataSource(typeormConfig);

@Module({
  providers: [
    GetCurrentUpdatedService,
    ...CronQueryHandlers,
    ...CronCommandHandlers,
    {
      useValue: dataSource,
      provide: 'datasource',
    },
  ],
  imports: [CqrsModule],
  controllers: [CronController],
})
export class CronModule implements OnModuleInit {
  async onModuleInit() {
    if (!dataSource.isInitialized) {
      await dataSource.initialize();
    }
  }
}
