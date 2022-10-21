import { Command } from "@nestjs-architects/typed-cqrs";
import { CommandHandler, ICommandHandler, QueryBus} from "@nestjs/cqrs";
import { UpdateJobSkillDto } from "../dto/update-job-skill.dto";
import { JobSkillEntity } from "../entities/job-skill.entity";
import { GetOneJobSkillQuery } from "../queries/get-one-job-skill.query";
import { JobSkillRepository } from "../repositories/job-skill.repository";

export class UpdateJobSkillCommand extends Command<JobSkillEntity>{
    constructor(public readonly id: number, public readonly dto: UpdateJobSkillDto) {
        super();
    }
}

@CommandHandler(UpdateJobSkillCommand)
export class UpdateJobSkillCommandHandler implements ICommandHandler<UpdateJobSkillCommand> {
    constructor(private readonly jobSkillRepository:JobSkillRepository,private readonly queryBus:QueryBus) { }
    async execute(command: UpdateJobSkillCommand): Promise<any> {
        const {id,dto} = command;
        const jobskill = await this.queryBus.execute(new GetOneJobSkillQuery(id));

        return this.jobSkillRepository.save({...jobskill,...dto}) 
    }
  }
