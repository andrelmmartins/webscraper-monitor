import fs from "fs";
import { v4 as uuid } from "uuid";

interface ScraperData {
  name: string;
  [key: string]: string;
}

interface ScraperDataID extends ScraperData {
  id: string;
}

interface Data {
  scrapers: ScraperDataID[];
}

const filePath = "../database/scrapers.json";

const readData = (): Data => {
  try {
    const dataBuffer = fs.readFileSync(filePath);
    const dataJSON = dataBuffer.toString();
    return JSON.parse(dataJSON);
  } catch (error) {
    return { scrapers: [] };
  }
};

const writeData = (data: Data) => {
  fs.writeFileSync(filePath, JSON.stringify(data));
};

export const service = {
  add: (scraper: ScraperData) => {
    const data = readData();
    const id = uuid();
    data.scrapers.push({ ...scraper, id });
    writeData(data);
  },

  remove: (scraper: ScraperDataID) => {
    const data = readData();
    data.scrapers = data.scrapers.filter((s) => s.id !== scraper.id);
    writeData(data);
  },
};
