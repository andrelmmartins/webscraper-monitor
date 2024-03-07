import "./opentelemetry/sdk";

import { metrics } from "@opentelemetry/api";
import ScraperList from "./schema/ScraperList";

import GetCollegeHistory from "./scrapers/GetCollegeHistory";
import GetJobsOnLinkedin from "./scrapers/GetJobsOnLinkedin";

const scrapersList = new ScraperList();

scrapersList.add(new GetCollegeHistory());
scrapersList.add(new GetJobsOnLinkedin());

const metric = metrics.getMeter("test");

const counter = metric.createCounter("webscrapers-add");
counter.add(scrapersList.scrapers.length, {
  names: scrapersList.scrapers.map((s) => s.name),
});

scrapersList.run();
