import { EmploymentType, ExpLevel, Gender } from '@constants/enum';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsDateString,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class UpdateUserDto {
  @ApiProperty()
  @IsDateString()
  @IsOptional()
  birth?: string;

  @ApiProperty()
  @IsNumber()
  id: number;

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
    enum: EmploymentType,
  })
  @IsEnum(EmploymentType)
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
