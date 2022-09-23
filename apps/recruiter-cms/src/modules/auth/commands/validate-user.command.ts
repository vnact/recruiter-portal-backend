import { CreateUUIDCommand } from '@modules/uuid/commands/create-uuid.command';
import { Command } from '@nestjs-architects/typed-cqrs';
import { ICommandHandler, CommandHandler, CommandBus } from '@nestjs/cqrs';
import { UtilService } from '@providers/utils.service';
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
  constructor(private readonly commandBus: CommandBus) {}
  async execute(command: ValidateUserCommand): Promise<boolean> {
    const {
      dto: { email, password },
    } = command;

    const hash = UtilService.generateHash(password);

    const { _id, account } = await this.commandBus.execute(
      new CreateUUIDCommand({ account: email, hash }),
    );

    console.log(_id, account);
    return true;
  }
}
