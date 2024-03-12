import { Request, Response } from "express";

import { scrapersList } from "../scrapers";

export class ScraperController {
  async run(req: Request, res: Response) {
    try {
      res.status(200).send({});

      for (const scraper of scrapersList) {
        await scraper.run();
      }
    } catch {
      return res.status(500).send({
        error: "something wrong happened in: run-scrapers",
      });
    }
  }
}
