import { AuthUser } from '@decorators/auth-user.decorator';
import { JwtAuthGuard } from '@guards/jwt-auth.guard';
import { JwtClaimsDto } from '@modules/auth/dto/jwt-claims.dto';
import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CreateJobLikeCommand } from '../commands/createJobLike.command';
import { CreateJobLikeDto } from '../dto/create-jobLike.dto';
import { GetAllJobLikeQuery } from '../queries/get-all-joblike.dto';

@ApiTags('JobLike')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('job-like')
export class JobLikeController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}
  @Post()
  async create(
    @AuthUser() user: JwtClaimsDto,
    @Body() createJobLikeDto: CreateJobLikeDto,
  ) {
    return this.commandBus.execute(
      new CreateJobLikeCommand(createJobLikeDto.jobId, user.id),
    );
  }

  @Get('me')
  async getJobLikes(@AuthUser() user: JwtClaimsDto) {
    return this.queryBus.execute(new GetAllJobLikeQuery(user.id));
  }
}
