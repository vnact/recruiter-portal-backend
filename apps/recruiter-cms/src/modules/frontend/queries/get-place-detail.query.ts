import { Query } from '@nestjs-architects/typed-cqrs';
import { HttpService } from '@nestjs/axios';
import { BadRequestException } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { firstValueFrom } from 'rxjs';

export class GetPlaceDetailQuery extends Query<string> {
  constructor(public readonly placeId) {
    super();
  }
}

@QueryHandler(GetPlaceDetailQuery)
export class GetPlaceDetailQueryHandler
  implements IQueryHandler<GetPlaceDetailQuery>
{
  constructor(private readonly httpService: HttpService) {}
  async execute(query: GetPlaceDetailQuery): Promise<any> {
    const { data } = await firstValueFrom(
      this.httpService.get('/place/details/json', {
        params: {
          place_id: query.placeId,
        },
      }),
    );

    if (data.status !== 'OK') throw new BadRequestException(data.error_message);

    return data.result;
  }
}
