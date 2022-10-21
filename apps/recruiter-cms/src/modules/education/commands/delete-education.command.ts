import { Command } from "@nestjs-architects/typed-cqrs";
import { ForbiddenException } from "@nestjs/common";
import { CommandHandler, ICommandHandler, QueryBus } from "@nestjs/cqrs";
import { EducationEntity } from "../entities/education.entity";
import { GetOneEducationQuery } from "../queries/get-one-education.query";
import { EducationRepository } from "../repositories/education.repository";

export class DeleteEducationCommand extends Command<EducationEntity>{
    constructor(public readonly id: number,public readonly userId:number) {
        super();
    }
}

@CommandHandler(DeleteEducationCommand)
export class DeleteEducationCommandHandler implements ICommandHandler<DeleteEducationCommand> {
  constructor(private readonly educationRepository:EducationRepository,private readonly queryBus:QueryBus) { }
    async execute(command: DeleteEducationCommand): Promise<EducationEntity> {
        const { id ,userId} = command;
        const education = await this.queryBus.execute(new GetOneEducationQuery(id));
        if(education.user.id !== userId){
            throw new ForbiddenException("You are not authorized to delete this education")
        }
        return this.educationRepository.remove(education);
    }
}