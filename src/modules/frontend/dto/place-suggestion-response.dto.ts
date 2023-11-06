import { ApiProperty } from '@nestjs/swagger';

export class PlaceSuggestionResponseDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;
}
