import { By, WebDriver } from "selenium-webdriver";

import Scraper from "../models/Scraper";
import InstrumentedWebDriver from "../wrappers/selenium";

/**
 * @author TheDancerCodes
 * @description TheDancerCodes made this code in Python. I converted to Javascript
 * @link https://github.com/TheDancerCodes/Selenium-Webscraping-Example/blob/master/webscraping_example.py
 */

export default class GitHubPinnedReposScraper implements Scraper {
  name = "github-pinned-repos-scraper";

  async run(driver: WebDriver | InstrumentedWebDriver) {
    try {
      await driver.get("https://github.com/TheDancerCodes");

      // Get all of the titles for the pinned repositories
      let titles_element = await driver.findElements(By.css("a.text-bold"));

      let titles = await Promise.all(titles_element.map((el) => el.getText()));

      // Get all of the pinned repo languages
      let language_element = await driver.findElements(
        By.css("span[itemProp='programmingLanguage']")
      );
      let languages = await Promise.all(
        language_element.map((el) => el.getText())
      );

      // Print the titles and languages
      console.log("TITLES:");
      console.log(titles, "\n");

      console.log("LANGUAGES:");
      console.log(languages, "\n");

      // Pair each title with its corresponding language and print each pair
      for (let i = 0; i < titles.length; i++) {
        console.log(`RepoName : Language`);
        console.log(`${titles[i]} : ${languages[i]}\n`);
      }
    } catch (err) {
      console.error("Error occurred:", err);
    } finally {
      await driver.quit();
    }
  }
}
