import { EmploymentType, ExpLevel, Gender } from '@constants/enum';
import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @ApiProperty()
  @IsNumber()
  @IsOptional()
  height?: number;

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  weight?: number;

  @ApiProperty({
    enum: Gender,
  })
  @IsEnum(Gender)
  gender: Gender;

  @ApiProperty()
  @IsString()
  @IsOptional()
  phoneNumber?: string;

  @ApiProperty({
    enum: ExpLevel,
  })
  @IsEnum(ExpLevel)
  level: ExpLevel;

  @ApiProperty()
  @IsString()
  @IsOptional()
  highSchool?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  familyRegisterNumber?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  identityCardNumber?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  hobby?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  character?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  placeOfOrigin?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({
    isArray: true,
    enum: EmploymentType,
  })
  @IsEnum(EmploymentType, { each: true })
  employmentType: EmploymentType[];

  @ApiProperty({
    type: [Number],
  })
  @IsNumber(
    {},
    {
      each: true,
    },
  )
  careersId: number[];
}
