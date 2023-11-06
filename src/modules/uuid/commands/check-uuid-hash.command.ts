import { Command } from '@nestjs-architects/typed-cqrs';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { ICommandHandler, CommandHandler } from '@nestjs/cqrs';
import { firstValueFrom } from 'rxjs';
import { CheckHashDto } from '../dto/check-hash.dto';
import { CreateUUIDAxiosResponseDto } from '../dto/create-uuid-response.dto';

export class CheckUUIDHashCommand extends Command<boolean> {
  constructor(public readonly dto: CheckHashDto) {
    super();
  }
}

@CommandHandler(CheckUUIDHashCommand)
export class CheckUUIDHashCommandHandler
  implements ICommandHandler<CheckUUIDHashCommand>
{
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {}
  async execute(command: CheckUUIDHashCommand): Promise<boolean> {
    const { data } = await firstValueFrom(
      this.httpService.post<CreateUUIDAxiosResponseDto>(
        '/user/hash',
        command.dto,
      ),
    );

    return !data.error && !!data.data?.userInfo;
  }
}
