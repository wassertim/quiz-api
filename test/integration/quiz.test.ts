import {initDatabase} from "./util/init.db";
import {login, registerUser} from "./util/api";
import request from "supertest";
import {app} from "../../app";
import {constants} from "http2";

describe("Register User API", () => {
  initDatabase();
  const user = {login: "laura", password: "mypassword"};
  beforeEach(() => {
    return registerUser(user);
  });
  test("Should create a quiz", async () => {
    const token = await login(user);
    const response = await request(app)
        .post("/quizzes")
        .set({Authorization: token})
        .send({});

    expect(response.statusCode).toBe(constants.HTTP_STATUS_OK);
  });
});
