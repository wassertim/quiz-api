import {app} from "../../../app";
import request from "supertest";
import {mongoConnect} from "../../../db";
import {Db, MongoClient} from "mongodb";
import {constants} from "http2";

const {HTTP_STATUS_CREATED, HTTP_STATUS_BAD_REQUEST, HTTP_STATUS_INTERNAL_SERVER_ERROR} = constants;

describe("Register User API", () => {
  let mongoClient: MongoClient;
  let db: Db;
  beforeAll(async () => {
    const {_db, client} = (await mongoConnect());
    mongoClient = client;
    db = _db;
  });
  beforeEach(async () => {
    (await db.collections())
        .filter(c => !c.collectionName.includes("system."))
        .forEach((c) => c.deleteMany({}));
  });
  afterAll(async () => {
    try {
      await mongoClient.close();
    } catch (e) {
      console.log(e);
    }
  });
  test("Should register a user", async () => {
    const response = await request(app)
        .post("/users/register")
        .send({login: "laura", password: "mypassword"});
    expect(response.statusCode).toBe(HTTP_STATUS_CREATED);
  });
  test("Should return an error when user exists", async () => {
    await request(app).post("/users/register").send({login: "laura", password: "mypassword"});

    const response = await request(app)
        .post("/users/register")
        .send({login: "laura", password: "mypassword"});

    expect(response.statusCode).toBe(HTTP_STATUS_BAD_REQUEST);
    expect(response.text).toBe("User with login laura already exists");
  });
  test("Should return an error when validation fails", async () => {
    const response = await request(app)
        .post("/users/register")
        .send({password: "mypassword"});

    expect(response.statusCode).toBe(HTTP_STATUS_BAD_REQUEST);
    expect(response.text).toBe("User data is not valid");
  });
});
describe("Register User API without DB", () => {
  test("Should return an error when on exception", async () => {
    const response = await request(app)
        .post("/users/register")
        .send({login: "laura", password: "mypassword"});

    expect(response.statusCode).toBe(HTTP_STATUS_INTERNAL_SERVER_ERROR);
    expect(response.text).not.toBeFalsy();
  });
});
