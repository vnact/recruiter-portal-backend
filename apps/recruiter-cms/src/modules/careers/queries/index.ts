import { GetAllCarrerQueryHandler } from './get-all-career';
import { GetAllCarrerByIdQueryHandler } from './get-all-career-by-id.query';
import { GetOneCareerQueryHandler } from './get-one-career';

export const CareerQueryHandlers = [
  GetOneCareerQueryHandler,
  GetAllCarrerQueryHandler,
  GetAllCarrerByIdQueryHandler,
];
