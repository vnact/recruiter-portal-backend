import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class PlaceSuggestionDto {
  @IsString()
  @ApiProperty()
  place: string;
}
