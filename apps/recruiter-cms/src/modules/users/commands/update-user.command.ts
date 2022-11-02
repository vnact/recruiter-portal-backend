import {
  Command,
  CommandHandler,
  ICommandHandler,
  QueryBus,
} from '@nestjs-architects/typed-cqrs';
import { UpdateUserDto } from '../dto/update-user.dto';
import { UserEntity } from '../entities/user.entity';
import { UserRepository } from '../repositories/user.repository';
import { ForbiddenException } from '@nestjs/common';
import { GetOneUserQuery } from '../queries/get-one-user.query';
import { GetAllCareerByIdQuery } from '@modules/careers/queries/get-all-career-by-id.query';

export class UpdateUserCommand extends Command<UserEntity> {
  constructor(
    public readonly id: number,
    public readonly userId: number,
    public readonly dto: UpdateUserDto,
  ) {
    super();
  }
}

@CommandHandler(UpdateUserCommand)
export class UpdateUserCommandHandler
  implements ICommandHandler<UpdateUserCommand>
{
  constructor(
    private readonly userRepository: UserRepository,
    private readonly queryBus: QueryBus,
  ) {}
  async execute(command: UpdateUserCommand): Promise<UserEntity> {
    const { id, userId, dto } = command;
    const user = await this.queryBus.execute(new GetOneUserQuery(id));
    if (user.id != userId) {
      throw new ForbiddenException(
        'You are not allowed to update this experience',
      );
    }
    const { careersId, ...otherFields } = dto;
    const careers = await this.queryBus.execute(
      new GetAllCareerByIdQuery(careersId),
    );
    return this.userRepository.save({ ...user, ...otherFields });
  }
}
