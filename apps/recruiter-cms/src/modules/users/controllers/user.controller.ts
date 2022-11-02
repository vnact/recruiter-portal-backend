import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Body, Controller, UseGuards, Patch, Param } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { JwtAuthGuard } from '@guards/jwt-auth.guard';
import { AuthUser } from '@decorators/auth-user.decorator';
import { JwtClaimsDto } from '@modules/auth/dto/jwt-claims.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { UpdateUserCommand } from '../commands/update-user.command';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private command: CommandBus) {}
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(
    @Param('id') id: number,
    @AuthUser() user: JwtClaimsDto,
    @Body() dto: UpdateUserDto,
  ) {
    return this.command.execute(new UpdateUserCommand(id, user.id, dto));
  }
}
