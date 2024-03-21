import { Request, Response } from "express";
import { Browser } from "selenium-webdriver";

import { scrapersList } from "../scrapers";
import InstrumentedDriver from "../wrappers/selenium";

export class ScraperController {
  async run(req: Request, res: Response) {
    try {
      res.status(200).send({});

      const browser = Browser.CHROME;

      for (const scraper of scrapersList) {
        await scraper.run(
          new InstrumentedDriver({ browser, scraperName: scraper.name })
        );
      }
    } catch {
      return res.status(500).send({
        error: "something wrong happened in: run-scrapers",
      });
    }
  }
}
