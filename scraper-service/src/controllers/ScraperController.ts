import { AxiosError } from "axios";
import { Request, Response } from "express";
import { Browser } from "selenium-webdriver";

import { api } from "../services/grafana";
import { scrapersList } from "../scrapers";
import InstrumentedDriver from "../wrappers/selenium";
import Trace from "../models/Trace";

export class ScraperController {
  async run(req: Request, res: Response) {
    try {
      const browser = Browser.CHROME;

      for (const scraper of scrapersList) {
        await scraper.run(
          new InstrumentedDriver({ browser, scraperName: scraper.name })
        );
      }

      return res.status(200).send({});
    } catch {
      return res.status(500).send({
        error: "something wrong happened in: run-scrapers",
      });
    }
  }

  async dashboard(req: Request, res: Response) {
    try {
      const datenow = Number(Date.now().toString().slice(0, 10));
      const yesteday = datenow - 60 * 60 * 24;

      const { data } = await api.get(
        "/datasources/proxy/uid/tempo/api/search",
        {
          params: {
            start: yesteday,
            end: datenow,
          },
        }
      );

      const traces: Trace[] = [];

      if (data?.traces && Array.isArray(data.traces)) {
        data.traces.forEach((t: any) => {
          const parsed = Trace.parse(t);
          if (parsed) traces.push(parsed);
        });
      }

      const scrapers = scrapersList.map((s) => ({
        name: s.name,
        description: s.description,
      }));

      res.status(200).send({
        traces,
        scrapers,
      });

      return;
    } catch (e) {
      console.log(e);
      return res.status(500).send({
        error: "something wrong happened in: dashboard",
        data: e,
      });
    }
  }
}
