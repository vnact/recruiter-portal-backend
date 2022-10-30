import { ApiProperty } from '@nestjs/swagger';
<<<<<<< HEAD
import { EmploymentType } from '@vnact/recruiter-shared-enum';
import { IsDateString, IsEnum, IsNumber, IsString } from 'class-validator';
=======
import { EmploymentType } from 'src/constants/enum';
import {
  IsBoolean,
  IsDateString,
  IsEnum,
  IsNumber,
  IsString,
} from 'class-validator';
>>>>>>> 3afc34abf80391514571ca08b6b87fc8cc5ff5af

export class CreateExperienceDto {
  @ApiProperty()
  @IsString()
  title: string;

  @ApiProperty()
  @IsNumber()
  company_id: number;

  @ApiProperty({
    example: '2020-01-01',
  })
  @IsDateString()
  start_date: Date;

  @ApiProperty({
    example: '2022-01-01',
  })
  @IsDateString()
  end_date: Date;

  @ApiProperty({
    enum: EmploymentType,
  })
  @IsEnum(EmploymentType)
  employment_type: EmploymentType;

  @ApiProperty()
  @IsString()
  description: string;

  @ApiProperty()
  @IsNumber()
  career_id: number;
}
