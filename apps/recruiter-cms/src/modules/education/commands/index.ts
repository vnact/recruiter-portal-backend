import { CreateEducationCommandHandler } from './create-education.command';
import { DeleteEducationCommandHandler } from './delete-education.command';
import { UpdateEducationCommandHandler } from './update-education.command';

export const EducationCommandHandlers = [
  CreateEducationCommandHandler,
  UpdateEducationCommandHandler,
  DeleteEducationCommandHandler,
];
