import { Controller, Post } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { ApiTags } from '@nestjs/swagger';
import { SyncDataCommand } from '../commands/sync-data.command';

@Controller('cron')
@ApiTags('cron')
export class CronController {
  constructor(private readonly commandBus: CommandBus) {}
  @Post('sync')
  sync() {
    return this.commandBus.execute(new SyncDataCommand());
  }
}
