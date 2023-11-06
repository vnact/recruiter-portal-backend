import { CreateTokenCommandHandler } from './create-token.command';
import { UserRegisterCommandHandler } from './user-register.command';
import { ValidateUserCommandHandler } from './validate-user.command';

export const AuthCommandHandlers = [
  ValidateUserCommandHandler,
  CreateTokenCommandHandler,
  UserRegisterCommandHandler,
];
