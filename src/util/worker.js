const worker = require("worker_threads");
const fs = require("fs");
const path = require("path");

/**
 * @param {fs.PathLike} [filePath]
 */
const isFile = (filePath) => fs.lstatSync(filePath).isFile();

const folderPath = path.join(__dirname, "../docs");

if (!fs.existsSync(folderPath)) {
  worker.parentPort.postMessage({
    type: "error",
    message: "Docs folder does not exist",
  });
} else {
  /** @type {{docs: string[], number: number}} */
  const workerData = worker.workerData;

  const allData = [];
  const allFiles = [workerData["docs"][workerData["number"]]]
    .map((fileName) => path.join(folderPath, fileName))
    .filter(isFile);

  for (const file of allFiles) {
    if (path.extname(file) !== ".txt") {
      // Send to error logger eg. Cloudwatch and use SNS to send notifications to engineer
      console.log("Please use .txt file for", file);
      continue;
    }
    const data = fs.readFileSync(file, { encoding: "utf8" });
    const splitData = data.split("\n");
    allData.push(...splitData);
  }
  worker.parentPort.postMessage({ type: "success", message: allData });
}
