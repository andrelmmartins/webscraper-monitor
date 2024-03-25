import InstrumentedWebDriver from "../wrappers/selenium";
import { WebDriver } from "selenium-webdriver";

export default interface Scraper {
  name: string;
  description: string;
  run: (driver: WebDriver | InstrumentedWebDriver) => Promise<void>;
}
