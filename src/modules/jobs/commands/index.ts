import { CreateJobSkillHandler } from './create-job-skill.command';
import { CreateJobCommandHandler } from './create-job.command';
import { DeleteJobSkillCommandHandler } from './delete-job-skill.command';
import { DeleteJobCommandHandler } from './delete-job.command';
import { UpdateJobSkillCommandHandler } from './update-job-skill.command';
import { UpdateJobCommandHandler } from './update-job.command';

export const JobCommandHandlers = [
  CreateJobCommandHandler,
  CreateJobSkillHandler,
  UpdateJobCommandHandler,
  UpdateJobSkillCommandHandler,
  DeleteJobSkillCommandHandler,
  DeleteJobCommandHandler,
];
