import { CreateJobSkillHandler } from './create-job-skill.command';
import { CreateJobCommandHandler } from './create-job.command';

export const JobCommandHandlers = [
  CreateJobCommandHandler,
  CreateJobSkillHandler,
];
