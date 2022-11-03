import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsOptional, IsString } from 'class-validator';

export class CreateUserSkillDto {
  @IsArray()
  @ApiProperty({
    example: [1],
  })
  skills_id: number[];

  @IsString()
  @IsOptional()
  @ApiProperty({
    example: '900/990',
  })
  certificate?: string;

  @IsString()
  @IsOptional()
  @ApiProperty({})
  description?: string;
}
