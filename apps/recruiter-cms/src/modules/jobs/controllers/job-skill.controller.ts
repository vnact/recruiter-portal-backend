import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiTags } from '@nestjs/swagger';
import { CreateJobSkillCommand } from '../commands/create-job-skill.command';
import { CreateJobSkillDto } from '../dto/create-job-skill';
import { GetOneJobSkillQuery } from '../queries/get-one-job-skill.query';

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

  @Get(':id')
  getOne(@Param('id') id: number) {
    return this.queryBus.execute(new GetOneJobSkillQuery(id));
  }
}
