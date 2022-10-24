import { PartialType } from '@nestjs/swagger';
import { CreateJobSkillDto } from './create-job-skill';

export class UpdateJobSkillDto extends PartialType(CreateJobSkillDto) {}
