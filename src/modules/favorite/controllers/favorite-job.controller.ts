import { AuthUser } from '@decorators/auth-user.decorator';
import { JwtAuthGuard } from '@guards/jwt-auth.guard';
import { JwtClaimsDto } from '@modules/auth/dto/jwt-claims.dto';
import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AddFavoriteJobCommand } from '../commands/add-favorite-job.command';
import { AddFavoriteJobDto } from '../dto/add-favorite-job.dto';
import { GetAllFavoriteJobQuery } from '../queries/get-all-favorite-job.query';

@ApiTags('favorite')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('favorite-job')
export class FavoriteJobController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}
  @Post()
  async create(@AuthUser() user: JwtClaimsDto, @Body() dto: AddFavoriteJobDto) {
    return this.commandBus.execute(
      new AddFavoriteJobCommand(dto.jobId, user.id),
    );
  }

  @Get('me')
  async getJobLikes(@AuthUser() user: JwtClaimsDto) {
    return this.queryBus.execute(new GetAllFavoriteJobQuery(user.id));
  }
}
