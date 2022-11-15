import dotenv from "dotenv";
import path from "path";

dotenv.config({
  path: path.join(__dirname, "../../env/test.env"),
});

describe("test config utils", () => {
  test("should set env vars correctly", () => {
    expect(process.env.PORT).toBe("4000");
  });
});
