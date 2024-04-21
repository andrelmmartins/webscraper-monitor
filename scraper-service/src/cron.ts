import cron from "node-cron";
import { Browser } from "selenium-webdriver";

import { scrapersList } from "./scrapers";
import InstrumentedWebDriver from "./wrappers/selenium";
import { ScraperInstanceController } from "./controllers/ScraperInstanceController";

const instances = new ScraperInstanceController();

cron.schedule("*/5 * * * *", () => {
  instances.list().forEach(({ name, id, props }) => {
    const instance = instances.find(name);

    if (instance) {
      instances.run(
        instance,
        props,
        new InstrumentedWebDriver({
          browser: Browser.CHROME,
          scraperName: instance.name,
          instanceID: id,
          ...props,
        })
      );
    }
  });
});
