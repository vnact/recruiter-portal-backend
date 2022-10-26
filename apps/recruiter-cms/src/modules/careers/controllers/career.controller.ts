import { Controller, Get } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { ApiTags } from '@nestjs/swagger';
import { GetALlCareerQuery } from '../queries/get-all-career';

@Controller('career')
@ApiTags('Career')
export class CareerController {
  constructor(private readonly queryBus: QueryBus) {}
  @Get()
  getAll() {
    return this.queryBus.execute(new GetALlCareerQuery());
  }
}
