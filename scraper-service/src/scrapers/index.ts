import Scraper from "../models/Scraper";

import GitHubPinnedReposScraper from "./GitHubPinnedReposScraper";

export const scrapersList: Scraper[] = [new GitHubPinnedReposScraper()];
