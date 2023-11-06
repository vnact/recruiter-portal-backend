import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateUUIDDto {
  @IsString()
  @ApiProperty()
  account: string;

  @IsString()
  @ApiProperty()
  hash: string;
}
