import { GetByUserEducationQueryHandler } from './get-by-user-education.query';
import { GetOneEducationQueryHandler } from './get-one-education.query';

export const EducationQueryHandlers = [
  GetOneEducationQueryHandler,
  GetByUserEducationQueryHandler,
];
