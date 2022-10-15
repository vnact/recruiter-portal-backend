import { AuthUser } from '@decorators/auth-user.decorator';
import { JwtAuthGuard } from '@guards/jwt-auth.guard';
import { JwtClaimsDto } from '@modules/auth/dto/jwt-claims.dto';
import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CreateExperienceCommand } from '../commands/create-experience.command';
import { CreateExperienceDto } from '../dto/create-experience.dto';

@ApiTags('experience')
@Controller('experience')
export class ExperienceController {
  constructor(private readonly commandBus: CommandBus) {}

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post()
  create(
    @AuthUser() user: JwtClaimsDto,
    @Body() createExperienceDto: CreateExperienceDto,
  ) {
    return this.commandBus.execute(
      new CreateExperienceCommand(user.id, createExperienceDto),
    );
  }
}
