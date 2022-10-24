import { firstValueFrom } from 'rxjs';
import { Command } from '@nestjs-architects/typed-cqrs';
import { HttpService } from '@nestjs/axios';
import { ICommandHandler, CommandHandler } from '@nestjs/cqrs';
import {
  CreateUUIDAxiosResponseDto,
  CreateUUIDResponseDto,
} from '../dto/create-uuid-response.dto';
import { CreateUUIDDto } from '../dto/create-uuid.dto';
import { BadRequestException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Logger } from '@nestjs/common';
export class CreateUUIDCommand extends Command<CreateUUIDResponseDto> {
  constructor(public readonly dto: CreateUUIDDto) {
    super();
  }
}

@CommandHandler(CreateUUIDCommand)
export class CreateUUIDCommandHandler
  implements ICommandHandler<CreateUUIDCommand>
{
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {}
  async execute(command: CreateUUIDCommand): Promise<CreateUUIDResponseDto> {
    const { dto } = command;
    Logger.log('tạo UUID1');
    const { data } = await firstValueFrom(
      this.httpService.post<CreateUUIDAxiosResponseDto>('/user/create', dto),
    );
    if (data.error || !data.data?.userInfo) {
      Logger.log(data.message);
      throw new BadRequestException(data.message);
    }
    Logger.log('tạo UUID');
    return data.data.userInfo;
  }
}
