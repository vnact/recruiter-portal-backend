import { CreateUserSkillHandler } from './create-user-skill.command';
import { CreateUserCommandHandler } from './create-user.command';
import { DeleteUserSkillCommandHandler } from './delete-user-skill.command';
import { UpdateUserCommandHandler } from './update-user.command';

export const UserCommandHandlers = [
  CreateUserCommandHandler,
  CreateUserSkillHandler,
  DeleteUserSkillCommandHandler,
  UpdateUserCommandHandler,
];
