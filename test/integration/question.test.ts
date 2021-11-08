import {initDatabase} from "./util/init.db";
import {login, registerUser} from "./util/api";
import request from "supertest";
import {app} from "../../app";
import {constants} from "http2";

describe("Questions API", () => {
  initDatabase();
  const user = {login: "laura", password: "mypassword"};
  beforeEach(async () => {
    await registerUser(user);
  });
  test("Should create a question", async () => {
    const token = await login(user);
    const response = await request(app)
        .post("/questions")
        .set({Authorization: token})
        .send({
          "questionText": "what is the answer to life the universe and everything",
          "questionScore": 5,
          "answers": [
            {
              "text": "42",
              "isCorrect": true
            },
            {
              "text": "42",
              "isCorrect": true
            }
          ]
        });

    expect(response.statusCode).toBe(constants.HTTP_STATUS_OK);
  });
});
