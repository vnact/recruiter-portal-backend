import { AuthUser } from '@decorators/auth-user.decorator';
import { JwtAuthGuard } from '@guards/jwt-auth.guard';
import { JwtClaimsDto } from '@modules/auth/dto/jwt-claims.dto';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CreateUserSkillCommand } from '../commands/create-user-skill.command';
import { DeleteUserSkillCommand } from '../commands/delete-user-skill.command';
import { CreateUserSkillDto } from '../dto/create-user-skill.dto';
import { DeleteUserSkillDto } from '../dto/delete-user-skill.dto';
import { GetOneUserSkillQuery } from '../queries/get-one-user-skill-query';

@ApiTags('user-skill')
@Controller('user-skill')
export class UserSkillController {
  constructor(private commandBus: CommandBus, private queryBus: QueryBus) {}

  @ApiBearerAuth()
  @Post()
  @UseGuards(JwtAuthGuard)
  create(@AuthUser() user: JwtClaimsDto, @Body() dto: CreateUserSkillDto) {
    return this.commandBus.execute(new CreateUserSkillCommand(user.id, dto));
  }

  @ApiBearerAuth()
  @Get(':skillId')
  @UseGuards(JwtAuthGuard)
  getOne(@AuthUser() user: JwtClaimsDto, @Param('skillId') skillId: number) {
    return this.queryBus.execute(new GetOneUserSkillQuery(user.id, skillId));
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Delete()
  delete(@AuthUser() user: JwtClaimsDto, @Body() dto: DeleteUserSkillDto) {
    return this.commandBus.execute(new DeleteUserSkillCommand(user.id, dto));
  }
}
