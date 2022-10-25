import { GetAllJobLikeQueryHandler } from './get-all-joblike.dto';
import { GetOneJobLikeQueryHandler } from './get-one-jobLike.query';

export const JobLikeQueryHandlers = [
  GetOneJobLikeQueryHandler,
  GetAllJobLikeQueryHandler,
];
