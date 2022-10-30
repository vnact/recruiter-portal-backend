import { GetAllJobQueryHandler } from './get-all-job.query';
import { GetAllJobByCompanyQueryHandler } from './get-jobs-by-company.query';
import { GetOneJobSkillQueryHandler } from './get-one-job-skill.query';
import { GetOneJobQueryHandler } from './get-one-job.query';
import { SearchJobQueryHandler } from './search-job.query';
import { SuggestJobQueryHandler } from './suggest-job.query';

export const JobQueryHandlers = [
  SearchJobQueryHandler,
  SuggestJobQueryHandler,
  GetOneJobQueryHandler,
  GetOneJobSkillQueryHandler,
  GetAllJobQueryHandler,
  GetAllJobByCompanyQueryHandler,
];
