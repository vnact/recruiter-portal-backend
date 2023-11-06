import { UserEntity } from '@modules/users/entities/user.entity';
import { Command } from '@nestjs-architects/typed-cqrs';
import { ICommandHandler, CommandHandler } from '@nestjs/cqrs';
import { TokenPayloadDto } from '../dto/token-payload.dto';
import { JwtService } from '@nestjs/jwt';

export class CreateTokenCommand extends Command<TokenPayloadDto> {
  constructor(public readonly user: UserEntity) {
    super();
  }
}

@CommandHandler(CreateTokenCommand)
export class CreateTokenCommandHandler
  implements ICommandHandler<CreateTokenCommand>
{
  constructor(private readonly jwtService: JwtService) {}
  async execute(command: CreateTokenCommand): Promise<TokenPayloadDto> {
    const { user } = command;

    const accessToken = this.jwtService.sign({
      id: user.id,
      email: user.email,
    });

    const { exp } = this.jwtService.verify(accessToken);

    return new TokenPayloadDto({
      accessToken,
      accessTokenExpired: new Date(exp * 1000).toISOString(),
    });
  }
}
