import { CreateExperienceHandler } from './create-experience.command';
import { DeleteExperienceCommandHandler } from './delete-experience.command';
import { UpdateExperienceCommandHandler } from './update-experience.command';

export const ExperienceCommandHandlers = [
  CreateExperienceHandler,
  UpdateExperienceCommandHandler,
  DeleteExperienceCommandHandler,
];
