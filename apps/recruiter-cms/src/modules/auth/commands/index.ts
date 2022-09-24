import { CreateTokenCommandHandler } from './create-token.command';
import { ValidateUserCommandHandler } from './validate-user.command';

export const AuthCommandHandlers = [
  ValidateUserCommandHandler,
  CreateTokenCommandHandler,
];
