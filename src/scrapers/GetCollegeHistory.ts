import Scraper from "../schema/Scraper";

export default class GetCollegeHistory implements Scraper {
  name = "get-college-history";

  async run() {
    console.log(this.name);
  }
}
