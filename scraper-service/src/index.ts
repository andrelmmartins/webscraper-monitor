import express from "express";
import cors from "cors";

import { ScraperRoutes } from "./routes";

const server = express();

server.use(
  cors({
    origin: "*",
  })
);

server.use("/scrapers", ScraperRoutes);

server.listen(3001, () => {
  console.log("Scraper Service: Online");
});
