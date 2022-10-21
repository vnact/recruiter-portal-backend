import { GetOneUserQuery } from '@modules/users/queries/get-one-user.query';
import { Command } from '@nestjs-architects/typed-cqrs';
import { NotFoundException } from '@nestjs/common';
import { CommandHandler, ICommandHandler, QueryBus } from '@nestjs/cqrs';
import { CreateEducationDto } from '../dto/create-education.dto';
import { EducationEntity } from '../entities/education.entity';
import { EducationRepository } from '../repositories/education.repository';

export class CreateEducationCommand extends Command<EducationEntity> {
  constructor(
    public readonly userId: number,
    public readonly dto: CreateEducationDto,
  ) {
    super();
  }
}

@CommandHandler(CreateEducationCommand)
export class CreateEducationCommandHandler
  implements ICommandHandler<CreateEducationCommand>
{
  constructor(
    private readonly educationRepository: EducationRepository,
    private readonly queryBus: QueryBus,
  ) {}
  async execute(command: CreateEducationCommand): Promise<EducationEntity> {
    const { userId, dto } = command;
    const user = await this.queryBus.execute(new GetOneUserQuery(userId));
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const education = this.educationRepository.create({
      school: dto.school,
      degree: dto.degree,
      fieldOfStudy: dto.fieldOfStudy,
      isCompleted: dto.isCompleted,
      startTime: dto.startTime,
      endTime: dto.endTime,
      description: dto.description,
      grade: dto.grade,
      createdById: userId,
    });
    education.user = user;
    return this.educationRepository.save(education);
  }
}
