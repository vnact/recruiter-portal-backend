import { AuthUser } from '@decorators/auth-user.decorator';
import { JwtAuthGuard } from '@guards/jwt-auth.guard';
import { JwtClaimsDto } from '@modules/auth/dto/jwt-claims.dto';
import { Body, Controller, Delete, Get, Post, UseGuards } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CreateApplyCommand } from '../commands/create-apply.command';
import { CreateApplyDto } from '../dto/create-apply.dto';
import { GetAllJobApplyByUserQuery } from '../queries/get-all-job-apply-by-user.query';

@Controller('apply')
@ApiTags('apply')
export class ApplyController {
  constructor(
    private commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get('me')
  async getAllJobApplyByUser(@AuthUser() user: JwtClaimsDto) {
    return await this.queryBus.execute(new GetAllJobApplyByUserQuery(user.id));
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post()
  async createApply(
    @Body() createApplyDto: CreateApplyDto,
    @AuthUser() user: JwtClaimsDto,
  ) {
    return await this.commandBus.execute(
      new CreateApplyCommand(createApplyDto.jobID, user.id),
    );
  }
}
