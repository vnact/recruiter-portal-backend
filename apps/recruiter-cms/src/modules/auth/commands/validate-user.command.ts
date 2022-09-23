import { GetOneUserQuery } from '@modules/users/queries/get-one-user-by-email.query';
import { CheckUUIDHashCommand } from '@modules/uuid/commands/check-uuid-hash.command';
import { Command } from '@nestjs-architects/typed-cqrs';
import {
  ICommandHandler,
  CommandHandler,
  CommandBus,
  QueryBus,
} from '@nestjs/cqrs';
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
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}
  async execute(command: ValidateUserCommand): Promise<boolean> {
    const {
      dto: { email, password },
    } = command;

    const user = await this.queryBus.execute(new GetOneUserQuery(email));
    console.log(user);

    const hash = UtilService.generateHash(password);

    const data = await this.commandBus.execute(
      new CheckUUIDHashCommand({ account: email, hash }),
    );

    console.log(data);
    return true;
  }
}
