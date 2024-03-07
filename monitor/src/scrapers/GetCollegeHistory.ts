import Scraper from "../schema/Scraper";

const delay = (amount = 750) =>
  new Promise((resolve) => setTimeout(resolve, amount));

export default class GetCollegeHistory implements Scraper {
  name = "get-college-history";

  async run() {
    await delay(5000);
    console.log("oi");
  }
}
