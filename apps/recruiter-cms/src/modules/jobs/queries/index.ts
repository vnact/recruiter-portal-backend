import { GetOneJobQueryHandler } from './get-one-job.query';
import { SearchJobQuery } from './search-job.query';
import { SuggestJobQueryHandler } from './suggest-job.query';

export const JobQueryHandlers = [
  SearchJobQuery,
  SuggestJobQueryHandler,
  GetOneJobQueryHandler,
];
