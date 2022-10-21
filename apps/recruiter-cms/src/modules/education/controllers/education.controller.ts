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
  Delete,
} from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CreateEducationCommand } from '../commands/create-education.command';
import { DeleteEducationCommand } from '../commands/delete-education.command';
import { UpdateEducationCommand } from '../commands/update-education.command';
import { CreateEducationDto } from '../dto/create-education.dto';
@ApiTags('education')
@Controller('education')
export class EducationController {
  constructor(private readonly commandBus: CommandBus) {}

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post()
  async create(
    @AuthUser() user: JwtClaimsDto,
    @Body() dto: CreateEducationDto,
  ) {
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
  @Delete(':id')
  async delete(@AuthUser() user: JwtClaimsDto, @Param('id') id: number) {
    return this.commandBus.execute(new DeleteEducationCommand(id, user.id));
  }
}
