import { Query } from '@nestjs-architects/typed-cqrs';
import { HttpService } from '@nestjs/axios';
import { BadRequestException } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { firstValueFrom } from 'rxjs';
import { PlaceSuggestionResponseDto } from '../dto/place-suggestion-response.dto';

export class GetPlaceSuggestionQuery extends Query<
  PlaceSuggestionResponseDto[]
> {
  constructor(public readonly place: string) {
    super();
  }
}

@QueryHandler(GetPlaceSuggestionQuery)
export class GetPlaceSuggestionQueryHandler
  implements IQueryHandler<GetPlaceSuggestionQuery>
{
  constructor(private readonly httpService: HttpService) {}

  async execute(
    query: GetPlaceSuggestionQuery,
  ): Promise<PlaceSuggestionResponseDto[]> {
    const { data } = await firstValueFrom(
      this.httpService.get('/place/autocomplete/json', {
        params: {
          input: query.place,
        },
      }),
    );

    if (data.status !== 'OK') throw new BadRequestException(data.error_message);

    return data.predictions.map((place) => ({
      id: place.place_id,
      name: place.description,
    }));
  }
}
