abstract class Scraper {
  abstract name: string;
  abstract run: () => Promise<void>;
}

export default Scraper;
