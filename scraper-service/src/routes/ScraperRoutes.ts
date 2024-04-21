import { Router } from "express";

import { ScraperController } from "../controllers/ScraperController";
import { ScraperInstanceController } from "../controllers/ScraperInstanceController";

const router = Router();

const controller = new ScraperController();
const instances = new ScraperInstanceController();

router.post("/", instances.create);
router.delete("/:id/", instances.delete);

router.post("/run/", controller.run);
router.post("/run/:id/", instances.runOnly);

router.get("/dashboard/", controller.dashboard);

router.get("/trace/:id/", controller.traceDetail);

export { router as ScraperRoutes };
