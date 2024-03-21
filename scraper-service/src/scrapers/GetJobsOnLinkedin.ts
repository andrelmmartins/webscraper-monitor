import Scraper from "../schema/Scraper";

export default class GetJobsOnLinkedin implements Scraper {
  name = "get-jobs-on-linkedin";

  async run() {
    console.log(this.name);
  }
}
