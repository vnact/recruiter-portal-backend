import { ApiProperty } from '@nestjs/swagger';
import { IsArray } from 'class-validator';

export class CreateUserSkillDto {
  @IsArray()
  @ApiProperty({
    example: [1],
  })
  skills_id: number[];
}
