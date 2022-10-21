import { Query } from "@nestjs-architects/typed-cqrs";
import { NotFoundException } from "@nestjs/common";
import {IQueryHandler, QueryHandler} from "@nestjs/cqrs";
import { JobSkillEntity } from "../entities/job-skill.entity";
import { JobSkillRepository } from "../repositories/job-skill.repository";

export class GetOneJobSkillQuery extends Query<JobSkillEntity>{
    constructor(public readonly id: number) {
        super();
    }
}

@QueryHandler(GetOneJobSkillQuery)
export class GetOneJobSkillQueryHandler implements IQueryHandler<GetOneJobSkillQuery> {
    constructor(private readonly jobSkillRepository:JobSkillRepository) { }
    async execute(query: GetOneJobSkillQuery): Promise<JobSkillEntity> {
        const { id } = query;
        const jobSkill = await this.jobSkillRepository.findOne({
          where: { id },
          relations: ['skill','job'],
        });
        if(!jobSkill){
            throw new NotFoundException('Job skill does not exist!');
        }
        return jobSkill;
    }
}