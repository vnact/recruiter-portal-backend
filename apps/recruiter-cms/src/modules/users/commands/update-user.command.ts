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
    const { userId, dto } = command;
    const user = await this.userRepository.findOne({
      where: {
        id: userId,
      },
      relations: {
        educations: true,
        experiences: {
          company: true,
          career: true,
        },
        favoriteJobs: {
          job: true,
        },
        appliedJobs: {
          job: true,
        },
        skills: true,
      },
    });
    // console.log(JSON.stringify(user, null, '\t'));
    const { careersId, ...otherFields } = dto;
    const careers = await this.queryBus.execute(
      new GetAllCareerByIdQuery(careersId),
    );
    console.log('đây là careers:   ', careers[0]);
    // console.log('all career', JSON.stringify(careers, null, '\t'));
    // console.log('12313');
    // console.log(
    //   JSON.stringify({ ...user, ...otherFields, careers }, null, '\t'),
    // );

    return this.userRepository.save({
      ...user,
      ...otherFields,
      careers,
    });
  }
}
