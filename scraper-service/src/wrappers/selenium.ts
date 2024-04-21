import { SpanStatusCode } from "@opentelemetry/api";
import { WebDriver, Builder, Locator, WebElement } from "selenium-webdriver";

import BaseWrapper from "./base";
import { ScraperProps } from "../models/Scraper";

export interface InstrumentedWebDriverProps extends ScraperProps {
  scraperName: string;
  instanceID: string;
  browser: string;
}

export default class InstrumentedWebDriver extends BaseWrapper {
  #driver: WebDriver;

  constructor({
    scraperName,
    instanceID,
    browser,
    ...scraperProps
  }: InstrumentedWebDriverProps) {
    super({
      tracerName: "otel-selenium",
      mainSpan: {
        name: `selenium-scraper-${scraperName}`,
        attributes: {
          scraper: scraperName,
          instance: instanceID,
          ...scraperProps,
        },
      },
    });

    this.#driver = new Builder().forBrowser(browser).build();

    this.mainSpan.setStatus({ code: SpanStatusCode.OK });
  }

  async get(url: string) {
    const span = this.createSpan(`get: ${url}`);

    try {
      return this.#driver.get(url);
    } catch (e) {
      span.setStatus({ code: SpanStatusCode.ERROR });
    } finally {
      span.end();
    }
  }

  async findElement(locator: Locator): Promise<WebElement> {
    const span = this.createSpan(`findElement: ${locator.toString()}`);

    try {
      return this.#driver.findElement(locator);
    } catch (e) {
      span.setStatus({ code: SpanStatusCode.ERROR });
    } finally {
      span.end();
    }

    return new WebElement(this.#driver, "");
  }

  async findElements(locator: Locator): Promise<WebElement[]> {
    const span = this.createSpan(`findElement: ${locator.toString()}`);

    try {
      return this.#driver.findElements(locator);
    } catch (e) {
      span.setStatus({ code: SpanStatusCode.ERROR });
    } finally {
      span.end();
    }

    return [];
  }

  async quit() {
    const span = this.createSpan("quit");
    try {
      return this.#driver.quit();
    } catch (e) {
      span.setStatus({ code: SpanStatusCode.ERROR });
    } finally {
      span.end();
      this.mainSpan.end();
    }
  }
}
