import {err, ok, Result} from 'neverthrow';
import {ServiceError} from "../types/errors";
import {User} from "../model/user";
import {getDB} from "../db";

export const USER_EXISTS = "USER_EXISTS";
export const VALIDATION_ERROR = "VALIDATION_ERROR";

export async function createUser(user: User): Promise<Result<User, ServiceError>> {
  const collection = getDB().collection("users");
  return ok((await collection.insertOne(user)) as User);
}
