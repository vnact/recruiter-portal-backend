import { AuthUser } from '@decorators/auth-user.decorator';
import { JwtAuthGuard } from '@guards/jwt-auth.guard';
import { JwtClaimsDto } from '@modules/auth/dto/jwt-claims.dto';
import {
  Body,
  Controller,
  Post,
  UseGuards,
  Patch,
  Param,
  Get,
  Delete,
  Logger,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CreateEducationCommand } from '../commands/create-education.command';
import { DeleteEducationCommand } from '../commands/delete-education.command';
import { UpdateEducationCommand } from '../commands/update-education.command';
import { CreateEducationDto } from '../dto/create-education.dto';
import { GetByUserEducationQuery } from '../queries/get-by-user-education.query';
import { GetOneEducationQuery } from '../queries/get-one-education.query';
@ApiTags('education')
@Controller('education')
export class EducationController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post()
  async create(
    @AuthUser() user: JwtClaimsDto,
    @Body() dto: CreateEducationDto,
  ) {
    Logger.log('Create Education');
    return this.commandBus.execute(new CreateEducationCommand(user.id, dto));
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async update(
    @AuthUser() user: JwtClaimsDto,
    @Body() dto: CreateEducationDto,
    @Param('id') id: number,
  ) {
    return this.commandBus.execute(
      new UpdateEducationCommand(id, user.id, dto),
    );
  }
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get()
  async getByUser(@AuthUser() user: JwtClaimsDto) {
    return this.queryBus.execute(new GetByUserEducationQuery(user.id));
  }
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async delete(@AuthUser() user: JwtClaimsDto, @Param('id') id: number) {
    return this.commandBus.execute(new DeleteEducationCommand(id, user.id));
  }
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async getById(@AuthUser() user: JwtClaimsDto, @Param('id') id: number) {
    return this.queryBus.execute(new GetOneEducationQuery(id));
  }
}
