import Scraper from "../model/Scraper";

import GetCollegeHistory from "./GetCollegeHistory";
import GetJobsOnLinkedin from "./GetJobsOnLinkedin";

export const scrapersList: Scraper[] = [
  new GetCollegeHistory(),
  new GetJobsOnLinkedin(),
];
