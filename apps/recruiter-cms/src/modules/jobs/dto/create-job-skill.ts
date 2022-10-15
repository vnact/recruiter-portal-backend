import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNumber } from 'class-validator';

export class JobSkillSubDto {
  @ApiProperty()
  @IsNumber()
  skill_id: number;

  @ApiProperty()
  @IsBoolean()
  is_required: boolean;
}

export class CreateJobSkillDto {
  @ApiProperty()
  @IsNumber()
  job_id: number;

  @ApiProperty({
    type: [JobSkillSubDto],
  })
  skillRequires: JobSkillSubDto[];
}
