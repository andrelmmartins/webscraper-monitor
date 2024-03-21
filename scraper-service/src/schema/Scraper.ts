interface Scraper {
  name: string;
  run: () => Promise<void>;
}

export default Scraper;
