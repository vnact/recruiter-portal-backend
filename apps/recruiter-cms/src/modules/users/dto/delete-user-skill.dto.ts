import { ApiProperty } from '@nestjs/swagger';
import { IsArray } from 'class-validator';

export class DeleteUserSkillDto {
  @IsArray()
  @ApiProperty({
    example: [1],
  })
  skills_id: number[];
}
