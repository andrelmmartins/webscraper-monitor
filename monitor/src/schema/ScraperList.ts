import Scraper from "./Scraper";

class ScraperList {
  scrapers: Scraper[];

  constructor() {
    this.scrapers = [];
  }

  add(scraper: Scraper) {
    if (this.scrapers.find((s) => s.name === scraper.name)) return;
    else this.scrapers.push(scraper);
  }

  remove(scraper: Scraper) {
    this.scrapers = this.scrapers.filter((s) => s.name !== scraper.name);
  }

  run() {
    return this.scrapers.forEach((s) => s.run());
  }
}

export default ScraperList;
