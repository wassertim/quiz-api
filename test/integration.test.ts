import {app} from "../app";
import request from "supertest";

describe("Countries API test", () => {
  test("It should GET all Countries", (done) => {
    request(app)
        .get("/home")
        .then(response => {
          expect(response.statusCode).toBe(200);
          done();
        });
  });
});
