import { Command } from '@nestjs-architects/typed-cqrs';
import { CommandHandler, ICommandHandler, QueryBus } from '@nestjs/cqrs';
import { ApplyEntity } from '../entities/apply.entity';
import { GetOneApplyQuery } from '../queries/get-one-apply.query';
import { ApplyRepository } from '../repositories/apply.repository';

export class DeleteApplyCommand extends Command<ApplyEntity> {
  constructor(public readonly userId: number, public readonly jobID: number) {
    super();
  }
}

@CommandHandler(DeleteApplyCommand)
export class DeleteApplyCommandHandler
  implements ICommandHandler<DeleteApplyCommand>
{
  constructor(
    private readonly applyRepository: ApplyRepository,
    private readonly queryBus: QueryBus,
  ) {}
  async execute(command: DeleteApplyCommand) {
    const { jobID, userId } = command;
    const apply = await this.queryBus.execute(
      new GetOneApplyQuery(userId, jobID),
    );
    return await this.applyRepository.remove(apply);
  }
}
