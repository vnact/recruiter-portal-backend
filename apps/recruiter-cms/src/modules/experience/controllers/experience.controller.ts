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
  UseGuards,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CreateExperienceCommand } from '../commands/create-experience.command';
import { DeleteExperienceCommand } from '../commands/delete-experience.command';
import { UpdateExperienceCommand } from '../commands/update-experience.command';
import { CreateExperienceDto } from '../dto/create-experience.dto';
import { UpdateExperienceDto } from '../dto/update-experience.dto';
import { GetOneExperienceQuery } from '../queries/get-one-experience.query';

@ApiTags('experience')
@Controller('experience')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
export class ExperienceController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}
  @Post()
  create(
    @AuthUser() user: JwtClaimsDto,
    @Body() createExperienceDto: CreateExperienceDto,
  ) {
    return this.commandBus.execute(
      new CreateExperienceCommand(user.id, createExperienceDto),
    );
  }
  @Get(':id')
  getOneById(@Param('id') id: number) {
    return this.queryBus.execute(new GetOneExperienceQuery(id));
  }
  @Patch(':id')
  update(
    @Param('id') id: number,
    @AuthUser() user: JwtClaimsDto,
    @Body() updateExperienceDto: UpdateExperienceDto,
  ) {
    return this.commandBus.execute(
      new UpdateExperienceCommand(id, user.id, updateExperienceDto),
    );
  }

  @Delete(':id')
  delete(@Param('id') id: number, @AuthUser() user: JwtClaimsDto) {
    return this.commandBus.execute(new DeleteExperienceCommand(id, user.id));
  }
}
