import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class AddFavoriteJobDto {
  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  jobId: number;
}
