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

  @ApiProperty({
    example: '2022-01-01',
  })
  @IsDateString()
  startTime: Date;

  @ApiProperty({
    example: '2022-01-01',
  })
  @IsDateString()
  // @IsOptional()
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
