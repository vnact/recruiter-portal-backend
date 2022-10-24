import { GetOneJobQuery } from "@modules/jobs/queries/get-one-job.query";
import { GetOneUserQuery } from "@modules/users/queries/get-one-user.query";
import { Command } from "@nestjs-architects/typed-cqrs";
import { CommandHandler, ICommandHandler, QueryBus } from "@nestjs/cqrs";
import { ApplyEntity } from "../entities/apply.entity";
import { ApplyRepository } from "../repositories/apply.repository";

export class CreateApplyCommand extends Command<ApplyEntity> {
  constructor(
    public readonly jobID: number,
    public readonly userId: number,
  ) {
    super();
  }
}

@CommandHandler(CreateApplyCommand)
export class CreateApplyCommandHandler implements ICommandHandler<CreateApplyCommand> {
  constructor(private readonly applyRepository:ApplyRepository, private readonly queryBus:QueryBus) {}

  async execute(command: CreateApplyCommand) {
    const { jobID, userId } = command;
    const job = await this.queryBus.execute(new GetOneJobQuery(jobID));
    const user = await this.queryBus.execute(new GetOneUserQuery(userId));
    const newApply = this.applyRepository.create({ jobID, userId });

    newApply.job = job;
    newApply.user = user;
    return await this.applyRepository.save(newApply);
  }
}