import { Controller, Get, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { SearchJobDto } from '../dto/search-job.dto';

@Controller('jobs')
@ApiTags('job')
export class JobController {
  @Get('search')
  searchJob(@Query() dto: SearchJobDto) {
    return dto;
  }
}
