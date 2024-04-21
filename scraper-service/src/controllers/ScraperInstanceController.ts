import { Request, Response } from "express";
import { Browser, WebDriver } from "selenium-webdriver";

import { service } from "../database";
import { scrapersList } from "../scrapers";
import Scraper, { ScraperProps } from "../models/Scraper";
import InstrumentedWebDriver from "../wrappers/selenium";

export class ScraperInstanceController {
  list() {
    return service.read().scrapers;
  }

  find(name: string) {
    return scrapersList.find((s) => s.name === name);
  }

  run(
    scraper: Scraper,
    props: ScraperProps,
    driver: WebDriver | InstrumentedWebDriver
  ) {
    if (this.hasAllProps(scraper, props)) {
      scraper.run(driver, props);
    }
  }

  hasAllProps(scraper: Scraper, props: ScraperProps) {
    const necessaryProps = scraper.necessaryProps();
    return !!Object.keys(necessaryProps).every(([name]) => props[name]);
  }

  async create(req: Request, res: Response) {
    try {
      const { name, props } = req.body;

      if (
        name &&
        props &&
        typeof name !== "string" &&
        typeof props !== "object"
      ) {
        const scraper = this.find(name);
        if (scraper && this.hasAllProps(scraper, props)) {
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

      if (!id) {
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
        const instances = this.list();
        const instance = instances.find((s) => s.id === id);
        const scraper = instance && this.find(instance.name);

        if (scraper) {
          this.run(
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
