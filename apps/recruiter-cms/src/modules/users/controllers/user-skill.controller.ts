import { AuthUser } from '@decorators/auth-user.decorator';
import { JwtAuthGuard } from '@guards/jwt-auth.guard';
import { JwtClaimsDto } from '@modules/auth/dto/jwt-claims.dto';
import {
  Body,
  Controller,
  Delete,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CreateUserSkillCommand } from '../commands/create-user-skill.command';
import { DeleteUserSkillCommand } from '../commands/delete-user-skill.command';
import { CreateUserSkillDto } from '../dto/create-user-skill.dto';
import { UpdateUserSkillDto } from '../dto/update-user-skill';

@ApiTags('user-skill')
@Controller('user-skill')
export class UserSkillController {
  constructor(private commandBus: CommandBus) {}

  @ApiBearerAuth()
  @Post()
  @UseGuards(JwtAuthGuard)
  create(@AuthUser() user: JwtClaimsDto, @Body() dto: CreateUserSkillDto) {
    return this.commandBus.execute(new CreateUserSkillCommand(user.id, dto));
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Delete()
  delete(@AuthUser() user: JwtClaimsDto, @Body() dto: UpdateUserSkillDto) {
    return this.commandBus.execute(new DeleteUserSkillCommand(user.id, dto));
  }
}
