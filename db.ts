import {MongoClient, Db} from "mongodb";

let _db: Db;
const uri = 'mongodb://localhost:27017/quiz';

export const mongoConnect = () => {
  return MongoClient.connect(uri)
      .then(client => {
        _db = client.db('quiz');
        return _db;
      });
};

export const getDB = () => {
  if (_db) {
    return _db;
  } else {
    throw new Error('DB connect failed');
  }
};
