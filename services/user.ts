import {err, ok, Result} from 'neverthrow';
import {ServiceError} from "../types/errors";
import {User} from "../model/user";
import {Users} from "../db";
import bcrypt from "bcrypt";

export const USER_EXISTS = "USER_EXISTS";
export const VALIDATION_ERROR = "VALIDATION_ERROR";
export const UNKNOWN_ERROR = "UNKNOWN_ERROR";

const saltRounds = 10;

const getHash = (password: string) => bcrypt.hash(password, saltRounds);

export async function createUser(user: User): Promise<Result<User, ServiceError>> {
  const {login, password} = user;
  if (!login || !password) {
    return err({code: VALIDATION_ERROR, message: "User data is not valid"});
  }
  try {
    if (await Users().findOne({login})) {
      return err({code: USER_EXISTS, message: `User with login ${login} already exists`});
    }

    return ok((await Users().insertOne({login, password: await getHash(password)})) as User);
  } catch (e) {
    return err({code: UNKNOWN_ERROR, message: `${e}`});
  }
}
