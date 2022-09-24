import { LocalAuthGuard } from '@guards/local-auth.guard';
import { Controller, Post, Request, UseGuards } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { CreateTokenCommand } from '../commands/create-token.command';
import { UserLoginDto } from '../dto/user-login-request.dto';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private readonly commandBus: CommandBus) {}
  @Post('login')
  @ApiBody({
    type: UserLoginDto,
  })
  @UseGuards(LocalAuthGuard)
  async login(@Request() req) {
    const token = await this.commandBus.execute(
      new CreateTokenCommand(req.user),
    );
    return {
      user: req.user,
      token,
    };
  }
}
