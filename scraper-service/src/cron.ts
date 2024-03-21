import cron from "node-cron";
import { scrapersList } from "./scrapers";
import InstrumentedWebDriver from "./wrappers/selenium";
import { Browser } from "selenium-webdriver";

cron.schedule("0 * * * * *", () => {
  for (let scraper of scrapersList) {
    scraper.run(
      new InstrumentedWebDriver({
        browser: Browser.CHROME,
        scraperName: scraper.name,
      })
    );
  }
});
