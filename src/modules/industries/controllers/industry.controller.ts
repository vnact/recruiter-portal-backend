import { GetAllIndustryQuery } from '@modules/industries/queries/get-all-industry-query';
import { GetOneIndustryQuery } from '@modules/industries/queries/get-one-industry';
import { Controller, Get, Param } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiTags } from '@nestjs/swagger';
import { get } from 'http';

@Controller('industry')
@ApiTags('industry')
export class IndustryController {
  constructor(
    private readonly queryBus: QueryBus, // private readonly commandBus: CommandBus,
  ) {}
  @Get()
  getAll() {
    return this.queryBus.execute(new GetAllIndustryQuery());
  }
  @Get(':id')
  getById(@Param('id') id: number) {
    return this.queryBus.execute(new GetOneIndustryQuery(id));
  }
}
