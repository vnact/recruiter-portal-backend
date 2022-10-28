import { Controller, Get } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { ApiTags } from '@nestjs/swagger';
import { GetAllCompanyQuery } from '../queries/get-all-company.query';

@Controller('company')
@ApiTags('company')
export class CompanyController {
  constructor(private readonly queryBus: QueryBus) {}
  @Get()
  getAll() {
    return this.queryBus.execute(new GetAllCompanyQuery());
  }
}
