import { Controller, Post } from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { UserLoginDto } from '../dto/user-login-request.dto';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  @Post('login')
  @ApiBody({
    type: UserLoginDto,
  })
  login() {
    return {
      message: 'success',
    };
  }
}
