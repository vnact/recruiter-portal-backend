import { Command } from '@nestjs-architects/typed-cqrs';
import { ICommandHandler, CommandHandler } from '@nestjs/cqrs';
import { CreateUserDto } from '../dto/create-user.dto';
import { UserEntity } from '../entities/user.entity';
import { UserRepository } from '../repositories/user.repository';
import { Logger } from '@nestjs/common';
export class CreateUserCommand extends Command<UserEntity> {
  constructor(public readonly dto: CreateUserDto) {
    super();
  }
}

@CommandHandler(CreateUserCommand)
export class CreateUserCommandHandler
  implements ICommandHandler<CreateUserCommand>
{
  constructor(private readonly userRepository: UserRepository) {}
  async execute(command: CreateUserCommand): Promise<UserEntity> {
    Logger.log('tạo user');
    const user = this.userRepository.create(command.dto);
    await this.userRepository.save(user);

    return user;
  }
}
