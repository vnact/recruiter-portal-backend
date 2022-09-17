import { GetPlaceDetailQueryHandler } from './get-place-detail.query';
import { GetPlaceSuggestionQueryHandler } from './get-place-suggestion.query';

export const frontendQueryHandlers = [
  GetPlaceSuggestionQueryHandler,
  GetPlaceDetailQueryHandler,
];
