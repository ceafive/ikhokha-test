import dotenv from "dotenv";
import path from "path";
import supertest from "supertest";

import app from "../../src/server";

dotenv.config({
  path: path.join(__dirname, "../../env/test.env"),
});

describe("test server is working", () => {
  test("should return 500 for wrong route", async function () {
    const res = await supertest(app).get("/test");
    expect(res.statusCode).toBe(500);
  });

  test("should return 200 for healthy route", async function () {
    const res = await supertest(app).get("/healthy");
    expect(res.statusCode).toBe(200);
    expect(res.text).toMatch(/WORKING!!/gi);
  });
});

describe("/process route", () => {
  test("should return 200 at api/process endpoint", async () => {
    const { statusCode, body } = await supertest(app).get("/api/process");
    expect(statusCode).toBe(200);
    expect(body).toHaveProperty("success", true);
    expect(body).toHaveProperty(["message", "shorterThan"]);
    expect(body).toHaveProperty(["message", "moverMentions"]);
    expect(body).toHaveProperty(["message", "shakerMentions"]);
    expect(body).toHaveProperty(["message", "questionsCount"]);
    expect(body).toHaveProperty(["message", "spamCount"]);
  });
});
