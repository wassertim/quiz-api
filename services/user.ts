import {err, ok, Result} from 'neverthrow';
import {ServiceError} from "../types/errors";
import {User} from "../model/user";
import {Users} from "../db";
import bcrypt from "bcrypt";

export enum UserErrors {
  USER_EXISTS, VALIDATION_ERROR, UNKNOWN_ERROR
}

const saltRounds = 10;

const getHash = (password: string) => bcrypt.hash(password, saltRounds);

export async function createUser(user: User): Promise<Result<User, ServiceError<UserErrors>>> {
  const {login, password} = user;
  if (!login || !password) {
    return err({code: UserErrors.VALIDATION_ERROR, message: "User data is not valid"});
  }
  try {
    if (await Users().findOne({login})) {
      return err({code: UserErrors.USER_EXISTS, message: `User with login ${login} already exists`});
    }

    return ok((await Users().insertOne({login, password: await getHash(password)})) as User);
  } catch (e) {
    return err({code: UserErrors.UNKNOWN_ERROR, message: `${e}`});
  }
}
