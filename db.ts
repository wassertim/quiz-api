import {MongoClient, Db} from "mongodb";

let _db: Db;
const uri = 'mongodb://localhost:27017/quiz';

export const mongoConnect = async () => {
  const client = await MongoClient.connect(uri);
  _db = client.db('quiz');
  await _db.collection("users").createIndex({"login": 1}, {unique: true});

  return _db;
};

export const getDB = () => {
  if (_db) {
    return _db;
  } else {
    throw new Error('DB connect failed');
  }
};

export const Users = () => getDB().collection("users");
