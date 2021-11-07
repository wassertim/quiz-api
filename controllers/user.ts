import {Request, Response, NextFunction} from "express";
import {createUser, UserErrors} from "../services/user";
import {constants} from "http2";
import {User} from "../model/user";

const {HTTP_STATUS_CREATED, HTTP_STATUS_BAD_REQUEST, HTTP_STATUS_INTERNAL_SERVER_ERROR} = constants;

export async function register(req: Request<unknown, unknown, User>, res: Response<User | string>) {
  return (await createUser(req.body))
      .map(user => res.status(HTTP_STATUS_CREATED).send(user))
      .mapErr(err => {
        if (([UserErrors.USER_EXISTS, UserErrors.VALIDATION_ERROR].includes(err.code))) {
          return res.status(HTTP_STATUS_BAD_REQUEST).send(err.message);
        }
        return res.status(HTTP_STATUS_INTERNAL_SERVER_ERROR).send(err.message);
      })
      .unwrapOr(() => res.status(HTTP_STATUS_INTERNAL_SERVER_ERROR).send("Unknown Error"));
}

export function login(req: Request, res: Response, next: NextFunction) {
  res.send();
}
