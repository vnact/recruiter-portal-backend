import { AuthUser } from '@decorators/auth-user.decorator';
import { JwtAuthGuard } from '@guards/jwt-auth.guard';
import { LocalAuthGuard } from '@guards/local-auth.guard';
import { GetOneUserQuery } from '@modules/users/queries/get-one-user.query';
import {
  Body,
  Controller,
  Get,
  Logger,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { CreateTokenCommand } from '../commands/create-token.command';
import { UserRegisterCommand } from '../commands/user-register.command';
import { JwtClaimsDto } from '../dto/jwt-claims.dto';
import { UserLoginDto } from '../dto/user-login-request.dto';
import { UserRegisterDto } from '../dto/user-register.dto';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}
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

  @Get('me')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  whoAmI(@AuthUser() user: JwtClaimsDto) {
    return this.queryBus.execute(new GetOneUserQuery(user.id));
  }

  @Post('register')
  async register(@Body() dto: UserRegisterDto) {
    const user = await this.commandBus.execute(new UserRegisterCommand(dto));
    const token = await this.commandBus.execute(new CreateTokenCommand(user));
    return {
      user,
      token,
    };
  }
}
