import { Command } from '@nestjs-architects/typed-cqrs';
import { NotFoundException, ForbiddenException } from '@nestjs/common';
import { CommandHandler, ICommandHandler, QueryBus } from '@nestjs/cqrs';
import { CreateEducationDto } from '../dto/create-education.dto';
import { EducationEntity } from '../entities/education.entity';
import { GetOneEducationQuery } from '../queries/get-one-education.query';
import { EducationRepository } from '../repositories/education.repository';

export class UpdateEducationCommand extends Command<EducationEntity> {
  constructor(
    public readonly id: number,
    public readonly userId: number,
    public readonly dto: CreateEducationDto,
  ) {
    super();
  }
}

@CommandHandler(UpdateEducationCommand)
export class UpdateEducationCommandHandler
  implements ICommandHandler<UpdateEducationCommand>
{
  constructor(
    private readonly educationRepository: EducationRepository,
    private readonly queryBus: QueryBus,
  ) {}
  async execute(command: UpdateEducationCommand): Promise<EducationEntity> {
    const { id, userId, dto } = command;
    const education = await this.queryBus.execute(new GetOneEducationQuery(id));
    if (education.user.id !== userId) {
      throw new ForbiddenException('You are not allowed to update this education');
    }
    const updatedEducation = await this.educationRepository.save({
      ...education,
      ...dto,
    });
    return updatedEducation;
  }
}
