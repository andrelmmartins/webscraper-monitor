import { Router } from "express";

import { ScraperController } from "../controller";

const router = Router();
const controller = new ScraperController();

router.post("/run", controller.run);

export { router as ScraperRoutes };
