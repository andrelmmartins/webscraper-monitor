import express from "express";
import cors from "cors";

const server = express();

server.use(
  cors({
    origin: "*",
  })
);

server.listen(3001, () => {
  console.log("Scraper Service: Online");
});
