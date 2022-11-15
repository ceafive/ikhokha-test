import dotenv from "dotenv";
import path from "path";

const result2 = dotenv.config({
  path: path.join(__dirname, "../env/dev.env"),
});

if (result2.error) {
  throw result2.error;
}
