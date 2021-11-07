import {app} from "../../../app";
import request from "supertest";
import {mongoConnect} from "../../../db";
import {Db, MongoClient} from "mongodb";

describe("API Integration test", () => {
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
    await mongoClient.close();
  });
  test("It should GET home", async () => {
    const response = await request(app)
        .post("/users/register")
        .send({login: "laura", password: "mypassword"});
    expect(response.statusCode).toBe(201);
  });
});
