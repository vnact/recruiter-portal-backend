import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiTags } from '@nestjs/swagger';
import { CreateSkillCommand } from '../commands/create-skill.command';
import { CreateSkillDto } from '../dto/create-skill.dto';
import { GetAllSkillQUery } from '../queries/get-all-skill-query';
import { GetOneSkillQuery } from '../queries/get-one-skill.query';

@ApiTags('skills')
@Controller('skills')
export class SkillController {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus,
  ) {}
  @Get(':id')
  getOne(@Param('id') id: number) {
    return this.queryBus.execute(new GetOneSkillQuery(id));
  }

  @Get()
  getAll() {
    return this.queryBus.execute(new GetAllSkillQUery());
  }

  @Post()
  createSkill(@Body() dto: CreateSkillDto) {
    return this.commandBus.execute(new CreateSkillCommand(dto));
  }
}
