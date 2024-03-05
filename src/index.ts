import ScraperList from "./schema/ScraperList";

import GetCollegeHistory from "./scrapers/GetCollegeHistory";
import GetJobsOnLinkedin from "./scrapers/GetJobsOnLinkedin";

const scrapersList = new ScraperList();

scrapersList.add(new GetCollegeHistory());
scrapersList.add(new GetJobsOnLinkedin());

scrapersList.run();
