import {app} from "../app";
import request from "supertest";

describe("API Integration test", () => {
  test("It should GET home", async () => {
    const response = await request(app).get("/home");
    expect(response.statusCode).toBe(200);
  });
});
