import { GetByIdEducationQueryHandler } from './get-by-id-education-query';
import { GetByUserEducationQueryHandler } from './get-by-user-education.query';
import { GetOneEducationQueryHandler } from './get-one-education.query';

export const EducationQueryHandlers = [
  GetOneEducationQueryHandler,
  GetByUserEducationQueryHandler,
  GetByIdEducationQueryHandler,
];
