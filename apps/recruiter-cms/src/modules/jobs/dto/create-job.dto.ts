import { ApiProperty } from '@nestjs/swagger';
import {
  EmploymentType,
  ExpLevel,
  Gender,
  Workplace,
} from 'src/constants/enum';
import {
  IsBoolean,
  IsDateString,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { JobSkillSubDto } from './create-job-skill';

export class CreateJobDto {
  @ApiProperty()
  @IsString()
  title: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  location?: string;

  @ApiProperty()
  @IsNumber()
  gpsLat: number;

  @ApiProperty()
  @IsNumber()
  gpsLng: number;

  @ApiProperty({
    isArray: true,
    enum: Gender,
  })
  @IsEnum(Gender, { each: true })
  gender: Gender[];

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  minSalary?: number;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  maxSalary?: number;

  @ApiProperty()
  @IsDateString()
  startDate: Date;

  @ApiProperty()
  @IsOptional()
  @IsDateString()
  endDate?: Date;

  @ApiProperty()
  @IsNumber()
  company_id: number;

  @ApiProperty()
  @IsNumber()
  career_id: number;

  @ApiProperty({
    isArray: true,
    enum: EmploymentType,
  })
  @IsEnum(EmploymentType, { each: true })
  employmentType: EmploymentType[];

  @ApiProperty({
    enum: ExpLevel,
  })
  @IsEnum(ExpLevel)
  level: ExpLevel;

  @ApiProperty({
    isArray: true,
    enum: Workplace,
  })
  @IsEnum(Workplace, { each: true })
  workplaces: Workplace[];

  @ApiProperty()
  @IsNumber()
  applies: number;

  @ApiProperty()
  @IsNumber()
  recruits: number;

  @ApiProperty({
    type: [JobSkillSubDto],
  })
  skillRequires: JobSkillSubDto[];
}
