import cron from "node-cron";
import { Browser } from "selenium-webdriver";

import InstrumentedWebDriver from "./wrappers/selenium";
import { ScraperInstanceController } from "./controllers/ScraperInstanceController";

cron.schedule("*/5 * * * *", () => {
  ScraperInstanceController.list().forEach(({ name, id, props }) => {
    const instance = ScraperInstanceController.find(name);

    if (instance) {
      ScraperInstanceController.run(
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
