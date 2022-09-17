import { Controller, Get, Param, Query } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { ApiTags } from '@nestjs/swagger';
import { PlaceSuggestionDto } from './dto/place-suggestion.dto';
import { GetPlaceDetailQuery } from './queries/get-place-detail.query';
import { GetPlaceSuggestionQuery } from './queries/get-place-suggestion.query';

@Controller('frontend')
@ApiTags('frontend')
export class FrontendController {
  constructor(private readonly queryBus: QueryBus) {}

  @Get('/place-suggestion')
  placeSuggestion(@Query() dto: PlaceSuggestionDto) {
    return this.queryBus.execute(new GetPlaceSuggestionQuery(dto.place));
  }

  @Get('/places/:placeId')
  getPlaceDetail(@Param('placeId') placeId: string) {
    return this.queryBus.execute(new GetPlaceDetailQuery(placeId));
  }
}
