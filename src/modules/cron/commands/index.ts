import { SyncDataCommandHandler } from './sync-data.command';
import { SyncElasticSearchCommandHandler } from './sync-elasticsearch.command';

export const CronCommandHandlers = [
  SyncElasticSearchCommandHandler,
  SyncDataCommandHandler,
];
