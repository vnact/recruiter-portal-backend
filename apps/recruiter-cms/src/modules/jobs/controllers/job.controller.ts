import { PaginationDto } from '@common/dto/pagination.dto';
import { AuthUser } from '@decorators/auth-user.decorator';
import { JwtAuthGuard } from '@guards/jwt-auth.guard';
import { JwtClaimsDto } from '@modules/auth/dto/jwt-claims.dto';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CreateJobCommand } from '../commands/create-job.command';
import { DeleteJobCommand } from '../commands/delete-job.command';
import { UpdateJobCommand } from '../commands/update-job.command';
import { CreateJobDto } from '../dto/create-job.dto';
import { SearchJobDto } from '../dto/search-job.dto';
import { UpdateJobDto } from '../dto/update-job.dto';
import { GetAllJobQuery } from '../queries/get-all-job.query';
import { GetAllJobByCompanyQuery } from '../queries/get-jobs-by-company.query';
import { GetOneJobQuery } from '../queries/get-one-job.query';
import { SearchJobQuery } from '../queries/search-job.query';
import { SuggestJobQuery } from '../queries/suggest-job.query';

@Controller('jobs')
@ApiTags('job')
export class JobController {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus,
  ) {}

  @Post('search')
  searchJob(@Body() dto: SearchJobDto) {
    return this.queryBus.execute(new SearchJobQuery(dto));
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get('suggest')
  async suggestJob(
    @AuthUser() user: JwtClaimsDto,
    @Query(new ValidationPipe({ transform: true }))
    suggestJobDto: PaginationDto,
  ) {
    const job = await this.queryBus.execute(
      new SuggestJobQuery(user.id, suggestJobDto),
    );
    return job;
  }

  @Post()
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  createJob(@AuthUser() user: JwtClaimsDto, @Body() dto: CreateJobDto) {
    return this.commandBus.execute(new CreateJobCommand(user.id, dto));
  }

  @Get(':id')
  async jobDetail(@Param('id') id: number) {
    return this.queryBus.execute(new GetOneJobQuery(id));
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async updateJob(
    @Param('id') id: number,
    @AuthUser() user: JwtClaimsDto,
    @Body() dto: UpdateJobDto,
  ) {
    return this.commandBus.execute(new UpdateJobCommand(id, user.id, dto));
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async deleteJob(@AuthUser() user: JwtClaimsDto, @Param('id') id: number) {
    return this.commandBus.execute(new DeleteJobCommand(id, user.id));
  }

  @Get()
  async getAllJob(@Query() dto: PaginationDto) {
    return this.queryBus.execute(new GetAllJobQuery(dto));
  }

  @Get('company/:id')
  async getAllJobByCompany(
    @Param('id') id: number,
    @Query() dto: PaginationDto,
  ) {
    return this.queryBus.execute(new GetAllJobByCompanyQuery(id, dto));
  }
}
