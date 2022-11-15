import * as e from "express";
import analyze from "../services/analyze";

const shakerRegex = /shaker/gi;
const moverRegex = /mover/gi;
const questionsRegex = /\?/g;
const spamRegex = /http(s)?:/;

const processFile = (req: e.Request, res: e.Response) => {
  try {
    if (req.parsedFiles) {
      const { parsedFiles } = req;
      const storeParsedFiles = analyze.runAnalytics(parsedFiles);

      const shorterThan = storeParsedFiles("SHORTER_THAN")(15);
      const moverMentions = storeParsedFiles("MENTIONS")(moverRegex);
      const shakerMentions = storeParsedFiles("MENTIONS")(shakerRegex);
      const questionsCount = storeParsedFiles("MENTIONS")(questionsRegex);
      const spamCount = storeParsedFiles("MENTIONS")(spamRegex);

      return res.status(200).json({
        success: true,
        message: {
          shorterThan,
          moverMentions,
          shakerMentions,
          questionsCount,
          spamCount,
        },
      });
    }
    return res.status(400).send({
      success: false,
      message: "An error occurred, " + "parsedFiles not found",
    });
  } catch (err) {
    if (err instanceof Error)
      return res.status(400).send({ success: false, message: err?.message });
  }
};

export default processFile;
