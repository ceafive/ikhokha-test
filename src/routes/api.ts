import { Router } from "express";

import processFile from "../controllers/process";
import readFile from "../middlewares/process";

const apiRouter = Router();

apiRouter.get("/process", readFile, processFile);

export default apiRouter;
