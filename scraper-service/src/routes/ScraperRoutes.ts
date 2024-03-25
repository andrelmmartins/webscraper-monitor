import { Router } from "express";

import { ScraperController } from "../controllers/ScraperController";

const router = Router();
const controller = new ScraperController();

router.post("/run/", controller.run);

router.get("/dashboard/", controller.dashboard);

export { router as ScraperRoutes };
