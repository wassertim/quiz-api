import {Db, MongoClient} from "mongodb";
import {mongoConnect} from "../../../db";

export function initDatabase() {
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
}
