import {err, ok, Result} from 'neverthrow';
import {ServiceError} from "../types/errors";
import {User} from "../model/user";

export const USER_EXISTS = "USER_EXISTS";
export const VALIDATION_ERROR = "VALIDATION_ERROR";

export async function createUser(user: User): Promise<Result<User, ServiceError>> {
  return new Promise((resolve) => {
    if (!user.login || !user.password) {
      return resolve(err({code: VALIDATION_ERROR, message: "User data is not valid"} as ServiceError));
    }
    return resolve(ok({...user, login: user.login + " test"}));
  });
}
