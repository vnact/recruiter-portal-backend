import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsString } from 'class-validator';

export class CreateUserSkillDto {
  @IsArray()
  @ApiProperty({
    example: [1],
  })
  skills_id: number[];

  @IsString()
  @ApiProperty({
    example: '900/990',
  })
  certificate?: string;
}
