import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsDateString, IsOptional, IsString } from 'class-validator';

export class CreateEducationDto {
  @ApiProperty()
  @IsString()
  school: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  degree?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  fieldOfStudy?: string;

  @ApiProperty()
  @IsBoolean()
  isCompleted: boolean;

  @ApiProperty()
  @IsDateString()
  startTime: Date;

  @ApiProperty()
  @IsDateString()
  @IsOptional()
  endTime?: Date;

  @ApiProperty()
  @IsString()
  @IsOptional()
  grade?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  description?: string;
}
