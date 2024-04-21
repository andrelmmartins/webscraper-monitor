import { Request, Response } from "express";
import { Browser, WebDriver } from "selenium-webdriver";

import { service } from "../database";
import { scrapersList } from "../scrapers";
import Scraper, { ScraperProps } from "../models/Scraper";
import InstrumentedWebDriver from "../wrappers/selenium";

export class ScraperInstanceController {
  constructor() {}

  static list = () => {
    return service.read().scrapers;
  };

  static find = (name: string) => {
    return scrapersList.find((s) => s.name === name);
  };

  static run = (
    scraper: Scraper,
    props: ScraperProps,
    driver: WebDriver | InstrumentedWebDriver
  ) => {
    if (ScraperInstanceController.hasAllProps(scraper, props)) {
      scraper.run(driver, props);
    }
  };

  static hasAllProps(scraper: Scraper, props: ScraperProps) {
    const necessaryProps = scraper.necessaryProps();

    return Object.keys(necessaryProps).every((name) => props[name]);
  }

  async create(req: Request, res: Response) {
    try {
      const { name, props } = req.body;

      if (
        name &&
        props &&
        typeof name === "string" &&
        typeof props === "object"
      ) {
        const scraper = ScraperInstanceController.find(name);

        if (scraper && ScraperInstanceController.hasAllProps(scraper, props)) {
          service.add({ name, props });
          return res.status(200).send({});
        }
      }

      return res.status(400).send({
        error: "invalid body: scpraper-instance-create",
      });
    } catch (e) {
      console.log(e);
      return res.status(500).send({
        error: "something wrong happened in: scpraper-instance-create",
        data: e,
      });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;

      if (id) {
        service.remove(id);
        return res.status(200).send({});
      }

      return res.status(500).send({
        error: "invalid params: scpraper-instance-delete",
      });
    } catch (e) {
      console.log(e);
      return res.status(500).send({
        error: "something wrong happened in: scpraper-instance-delete",
        data: e,
      });
    }
  }

  async runOnly(req: Request, res: Response) {
    try {
      const { id } = req.params;

      if (!id) {
        const instances = ScraperInstanceController.list();
        const instance = instances.find((s) => s.id === id);
        const scraper =
          instance && ScraperInstanceController.find(instance.name);

        if (scraper) {
          ScraperInstanceController.run(
            scraper,
            instance.props,
            new InstrumentedWebDriver({
              browser: Browser.CHROME,
              scraperName: instance.name,
              instanceID: instance.id,
              ...instance.props,
            })
          );

          return res.status(200).send({});
        }
      }

      return res.status(500).send({
        error: "invalid params: scpraper-instance-delete",
      });
    } catch (e) {
      console.log(e);
      return res.status(500).send({
        error: "something wrong happened in: scpraper-instance-delete",
        data: e,
      });
    }
  }
}
