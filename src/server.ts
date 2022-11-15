import morgan from "morgan";
import helmet from "helmet";
import express, { Request, Response } from "express";
import cors from "cors";
import "express-async-errors";

import BaseRouter from "./routes/api";
import EnvVars from "./declarations/major/EnvVars";
import HttpStatusCodes from "./declarations/major/HttpStatusCodes";
import { NodeEnvs } from "./declarations/enums";
import { RouteError } from "./declarations/classes";

const app = express();

// eslint-disable-next-line @typescript-eslint/no-unsafe-call
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.disable("x-powered-by");

if (EnvVars.nodeEnv === NodeEnvs.Dev) {
  app.use(
    morgan(
      '`:remote-addr :date[web] ":method :url" :status :response-time ms ":user-agent"`'
    )
  );
}

if (EnvVars.nodeEnv === NodeEnvs.Production) {
  app.use(helmet());
}

app.use("/healthy", (_, res) => res.send("WORKING!!"));
app.use("/api", BaseRouter);

app.use((err: Error, _: Request, res: Response) => {
  let status = HttpStatusCodes.BAD_REQUEST;
  if (err instanceof RouteError) {
    status = err.status;
  }
  return res.status(status).json({ error: err.message });
});

export default app;
