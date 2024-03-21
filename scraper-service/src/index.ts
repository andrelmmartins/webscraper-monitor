import express from "express";
import cors from "cors";

import "./opentelemetry";
import "./cron";
import { ScraperRoutes } from "./routes/ScraperRoutes";

const server = express();

server.use(
  cors({
    origin: "*",
  })
);

server.use("/scrapers", ScraperRoutes);

server.listen(3012, () => {
  console.log("Scraper Service: Online");
});