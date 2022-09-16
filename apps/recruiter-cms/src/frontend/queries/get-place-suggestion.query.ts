import { Query } from '@nestjs-architects/typed-cqrs';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { firstValueFrom } from 'rxjs';

export class GetPlaceSuggestionQuery extends Query<string> {
  constructor(public readonly place: string) {
    super();
  }
}

@QueryHandler(GetPlaceSuggestionQuery)
export class GetPlaceSuggestionQueryHandler
  implements IQueryHandler<GetPlaceSuggestionQuery>
{
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {}

  async execute(query: GetPlaceSuggestionQuery): Promise<any> {
    const { data } = await firstValueFrom(
      this.httpService.get('/place/autocomplete/json', {
        params: {
          input: query.place,
          key: this.configService.get('GOOGLEMAP_API_KEY'),
        },
      }),
    );
    if (data.status !== 'OK') throw new Error('Error happend');

    return data.predictions;
  }
}
