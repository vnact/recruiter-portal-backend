import { UserEntity } from '@modules/users/entities/user.entity';
import { GetOneUserByEmailQuery } from '@modules/users/queries/get-one-user-by-email.query';
import { CheckUUIDHashCommand } from '@modules/uuid/commands/check-uuid-hash.command';
import { Command } from '@nestjs-architects/typed-cqrs';
import { NotFoundException, UnauthorizedException } from '@nestjs/common';
import {
  ICommandHandler,
  CommandHandler,
  CommandBus,
  QueryBus,
} from '@nestjs/cqrs';
import { UserLoginDto } from '../dto/user-login-request.dto';

export class ValidateUserCommand extends Command<boolean> {
  constructor(public readonly dto: UserLoginDto) {
    super();
  }
}

@CommandHandler(ValidateUserCommand)
export class ValidateUserCommandHandler
  implements ICommandHandler<ValidateUserCommand>
{
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}
  async execute(
    command: ValidateUserCommand,
  ): Promise<Pick<UserEntity, 'id' | 'email' | 'role'>> {
    const {
      dto: { email, password },
    } = command;

    const user = await this.queryBus.execute(new GetOneUserByEmailQuery(email));

    if (!user) {
      throw new NotFoundException('Cannot found user');
    }

    const isCorrectPassword = await this.commandBus.execute(
      new CheckUUIDHashCommand({ account: email, hash: password }),
    );

    if (!isCorrectPassword) {
      throw new UnauthorizedException('Email or password is not correct');
    }

    return {
      id: user.id,
      email: user.email,
      role: user.role,
    };
  }
}
