import { CreateUserCommand } from '@modules/users/commands/create-user.command';
import { UserEntity } from '@modules/users/entities/user.entity';
import { CreateUUIDCommand } from '@modules/uuid/commands/create-uuid.command';
import { Command } from '@nestjs-architects/typed-cqrs';
import { ICommandHandler, CommandHandler, CommandBus } from '@nestjs/cqrs';
import { UserRegisterDto } from '../dto/user-register.dto';

export class UserRegisterCommand extends Command<UserEntity> {
  constructor(public readonly dto: UserRegisterDto) {
    super();
  }
}

@CommandHandler(UserRegisterCommand)
export class UserRegisterCommandHandler
  implements ICommandHandler<UserRegisterCommand>
{
  constructor(private readonly commandBus: CommandBus) {
    //
  }
  async execute(command: UserRegisterCommand): Promise<UserEntity> {
    const {
      dto: { email, password, ...fields },
    } = command;

    const { _id } = await this.commandBus.execute(
      new CreateUUIDCommand({
        account: email,
        hash: password,
      }),
    );
    const user = await this.commandBus.execute(
      new CreateUserCommand({
        email,
        ...fields,
        uid: _id,
      }),
    );

    return user;
  }
}
