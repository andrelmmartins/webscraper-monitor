import { Request, Response } from "express";
import { Browser } from "selenium-webdriver";

import { api } from "../services/grafana";
import { scrapersList } from "../scrapers";
import InstrumentedDriver from "../wrappers/selenium";
import Trace from "../models/Trace";
import { AxiosError } from "axios";

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

  async executions(req: Request, res: Response) {
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

      const parsedTraces: Trace[] = [];

      if (data?.traces && Array.isArray(data.traces)) {
        data.traces.forEach((t: any) => {
          const parsed = Trace.parse(t);
          if (parsed) parsedTraces.push(parsed);
        });
      }

      return res.status(200).send(parsedTraces);
    } catch (e) {
      console.log((e as AxiosError).response?.data);
      return res.status(500).send({
        error: "something wrong happened in: get-traces",
      });
    }
  }
}
