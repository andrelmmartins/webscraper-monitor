import { WebDriver } from "selenium-webdriver";

import InstrumentedWebDriver from "../wrappers/selenium";

export interface ScraperProps {
  [key: string]: string;
}

export default interface Scraper {
  name: string;
  description: string;

  run(
    driver: WebDriver | InstrumentedWebDriver,
    props: ScraperProps
  ): Promise<void>;

  necessaryProps: () => ScraperProps;
}
