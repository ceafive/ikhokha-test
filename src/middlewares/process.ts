import * as e from "express";
import { IReq, WorkerPostData } from "../routes/shared/types";
import { Worker } from "worker_threads";
import path from "path";
import fs from "fs";

const folderPath = path.join(__dirname, "../docs");
const docs = fs.readdirSync(folderPath);

function createWorker(number: number): Promise<string[]> {
  return new Promise(function (resolve, reject) {
    // DANGEROUS
    const workerFilePath = path.join(__dirname, "../util/worker.js");
    const worker = new Worker(workerFilePath, {
      workerData: { docs, number },
    });
    worker.on("message", (data: WorkerPostData<string | string[]>) => {
      if (data.type === "error") {
        reject(data.message);
      }

      resolve(data.message as string[]);
    });
    worker.on("error", (err) => {
      reject(`An error occurred: ${err?.message}`);
    });
  });
}

const readFile = async (req: IReq, __: e.Response, next: e.NextFunction) => {
  try {
    const workerPromises = [];
    for (let i = 0; i < docs?.length; i++) {
      workerPromises.push(createWorker(i));
    }

    const thread_results = await Promise.all(workerPromises);

    const flattened = thread_results.flat();
    req["parsedFiles"] = flattened;
    next();
  } catch (err) {
    next(err);
  }
};

export default readFile;
