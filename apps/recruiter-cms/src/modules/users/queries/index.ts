import { GetAllSkillUserHandler } from './get-all-skill-of -user';
import { GetOneUserByEmailQueryHandler } from './get-one-user-by-email.query';
import { GetOneUserQueryHandler } from './get-one-user.query';
import { GetRoleRecordQueryHandler } from './get-role-record.query';

export const UserQueryHandlers = [
  GetOneUserQueryHandler,
  GetOneUserByEmailQueryHandler,
  GetRoleRecordQueryHandler,
  GetAllSkillUserHandler,
];
