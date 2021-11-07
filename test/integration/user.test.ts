import {app} from "../../app";
import request from "supertest";
import {constants} from "http2";
import {initDatabase} from "./util/init.db";

async function registerUser(user: { password: string; login: string }) {
  await request(app).post("/users/register").send(user);
}

describe("Register User API", () => {
  initDatabase();
  test("Should register a user", async () => {
    const response = await request(app)
        .post("/users/register")
        .send({login: "laura", password: "mypassword"});
    expect(response.statusCode).toBe(constants.HTTP_STATUS_CREATED);
  });
  test("Should return an error when user exists", async () => {
    const user = {login: "laura", password: "mypassword"};
    await registerUser(user);

    const response = await request(app)
        .post("/users/register")
        .send(user);

    expect(response.statusCode).toBe(constants.HTTP_STATUS_BAD_REQUEST);
    expect(response.text).toBe("User with login laura already exists");
  });
  test("Should return an error when validation fails", async () => {
    const response = await request(app)
        .post("/users/register")
        .send({password: "mypassword"});

    expect(response.statusCode).toBe(constants.HTTP_STATUS_BAD_REQUEST);
    expect(response.text).toBe("User data is not valid");
  });
});
describe("Register User API without DB", () => {
  test("Should return an error when on exception", async () => {
    const response = await request(app)
        .post("/users/register")
        .send({login: "laura", password: "mypassword"});

    expect(response.statusCode).toBe(constants.HTTP_STATUS_INTERNAL_SERVER_ERROR);
    expect(response.text).not.toBeFalsy();
  });
});
describe("Login User API", () => {
  initDatabase();
  const user = {login: "laura", password: "mypassword"};
  beforeEach (() => {
    return registerUser(user);
  });
  test("Should login user", async () => {
    const response = await request(app)
        .post("/users/login")
        .send(user);

    expect(response.statusCode).toBe(constants.HTTP_STATUS_OK);
    expect(response.text).toBe("Basic bGF1cmE6bXlwYXNzd29yZA==");
  });
});
