import { Body, Controller, Post } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiTags } from '@nestjs/swagger';
import { CreateJobSkillCommand } from '../commands/create-job-skill.command';
import { CreateJobSkillDto } from '../dto/create-job-skill';

@Controller('job-skill')
@ApiTags('job-skill')
export class JobSkillController {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus,
  ) {}
  @Post()
  createJobSkill(@Body() dto: CreateJobSkillDto) {
    return this.commandBus.execute(new CreateJobSkillCommand(dto));
  }
}
