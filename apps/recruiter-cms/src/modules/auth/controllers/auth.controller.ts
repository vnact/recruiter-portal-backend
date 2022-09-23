import { LocalAuthGuard } from '@guards/local-auth.guard';
import { Controller, Post, Request, UseGuards } from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { UserLoginDto } from '../dto/user-login-request.dto';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  @Post('login')
  @ApiBody({
    type: UserLoginDto,
  })
  @UseGuards(LocalAuthGuard)
  login(@Request() req) {
    console.log('User', req.user);

    return {
      message: 'success',
    };
  }
}
