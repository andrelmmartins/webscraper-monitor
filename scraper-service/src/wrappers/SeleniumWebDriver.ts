import { SpanStatusCode } from "@opentelemetry/api";
import {
  WebDriver,
  Builder,
  Locator,
  WebElementPromise,
  WebElement,
} from "selenium-webdriver";

import BaseWrapper from "./base";

export interface OtelSeleniumWebDriverProps {
  scraperName: string;
  browser: string;
}

export default class OtelSeleniumWebDriver extends BaseWrapper {
  driver: WebDriver;

  constructor(props: OtelSeleniumWebDriverProps) {
    super({
      tracerName: "otel-selenium",
      mainSpan: {
        name: `selenium-scraper-${props.scraperName}`,
        attributes: {},
      },
    });

    this.driver = new Builder().forBrowser(props.browser).build();
    console.log("this.driver.get", this.driver.get.toString());
    console.log("this.driver.findElement", this.driver.findElement.toString());
    console.log(
      "this.driver.findElements",
      this.driver.findElements.toString()
    );
    console.log("this.driver.quit", this.driver.quit.toString());
  }

  async get(url: string) {
    const span = this.createSpan(`get: ${url}`);

    try {
      return this.driver.get(url);
    } catch (e) {
      span.setStatus({ code: SpanStatusCode.ERROR });
    } finally {
      span.end();
    }
  }

  async findElement(locator: Locator): Promise<WebElement> {
    const span = this.createSpan(`findElement: ${locator.toString()}`);

    try {
      return this.driver.findElement(locator);
    } catch (e) {
      span.setStatus({ code: SpanStatusCode.ERROR });
    } finally {
      span.end();
    }

    return new WebElement(this.driver, "");
  }

  async findElements(locator: Locator): Promise<WebElement[]> {
    const span = this.createSpan(`findElement: ${locator.toString()}`);

    try {
      return this.driver.findElements(locator);
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
      return this.driver.quit();
    } catch (e) {
      span.setStatus({ code: SpanStatusCode.ERROR });
    } finally {
      span.end();
    }
  }
}
