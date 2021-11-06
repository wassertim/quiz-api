import {err, ok, Result} from 'neverthrow';
import {ServiceError} from "../types/errors";

export async function createUser(user: string): Promise<Result<string, ServiceError>> {
  if (!user) {
    return err({code: "", message: ""} as ServiceError);
  }
  return ok(user);
}
