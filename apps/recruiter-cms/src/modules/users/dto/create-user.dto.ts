import { ApiProperty } from '@nestjs/swagger';
import { Gender } from '@vnact/recruiter-shared-enum';
import {
  IsEnum,
  IsOptional,
  IsString,
  IsUUID,
  IsDateString,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  @ApiProperty({
    example: 'cuong.tran@gmail.com',
  })
  email: string;

  @IsString()
  @IsOptional()
  @ApiProperty({
    example: 'Tran Nhat Linh',
  })
  name?: string;

  @IsEnum(Gender)
  @IsOptional()
  @ApiProperty({
    enum: Gender,
  })
  gender?: Gender = Gender.Other;

  @IsDateString()
  @IsOptional()
  @ApiProperty()
  birthDay?: Date;

  @IsString()
  @IsUUID()
  @ApiProperty()
  uid: string;
}
