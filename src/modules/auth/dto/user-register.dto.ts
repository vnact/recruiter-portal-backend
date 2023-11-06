import { CreateUserDto } from '@modules/users/dto/create-user.dto';
import { ApiProperty, OmitType } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class UserRegisterDto extends OmitType(CreateUserDto, ['uid']) {
  @IsString()
  @ApiProperty()
  password: string;
}
