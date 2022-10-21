import { Command } from "@nestjs-architects/typed-cqrs";
import {ForbiddenException} from "@nestjs/common";
import { CommandHandler, ICommandHandler, QueryBus } from "@nestjs/cqrs";
import { UpdateExperienceDto } from "../dto/update-experience.dto";
import { ExperienceEntity } from "../entities/experience.entity";
import { GetOneExperienceQuery } from "../queries/get-one-experience.query";
import { ExperienceRepository } from "../repositories/experience.repository";

export class UpdateExperienceCommand extends Command<ExperienceEntity> {
  constructor(
    public readonly id: number,
    public readonly userId: number,
    public readonly dto: UpdateExperienceDto,
  ) {
    super();
  }
}

@CommandHandler(UpdateExperienceCommand)
export class UpdateExperienceCommandHandler implements ICommandHandler<UpdateExperienceCommand> {
  constructor(private readonly experienceRepository: ExperienceRepository ,private readonly queryBus: QueryBus) {}
  async execute(command: UpdateExperienceCommand): Promise<ExperienceEntity> {
    const { id, userId, dto } = command;
    const experience = await this.queryBus.execute(new GetOneExperienceQuery(id));
    if(experience.user.id !== userId) {
      throw new ForbiddenException('You are not allowed to update this experience');
    }
    return this.experienceRepository.save({...experience, ...dto});
  }
}