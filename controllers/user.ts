import {Request, Response, NextFunction} from "express";
import {createUser} from "../services/user";
import {constants} from "http2";

const {HTTP_STATUS_CREATED, HTTP_STATUS_BAD_REQUEST, HTTP_STATUS_INTERNAL_SERVER_ERROR} = constants;

export async function register(req: Request, res: Response) {
  return (await createUser(req.body))
      .map(user => res.status(HTTP_STATUS_CREATED).send(user))
      .mapErr(err => {
        if ((["USER_EXISTS", "VALIDATION_ERROR"].includes(err.code))) {
          return res.status(HTTP_STATUS_BAD_REQUEST).send(err.message);
        }
        return res.status(HTTP_STATUS_INTERNAL_SERVER_ERROR).send(err);
      })
      .unwrapOr(res.status(HTTP_STATUS_INTERNAL_SERVER_ERROR).send("Unknown Error"));
}

export function login(req: Request, res: Response, next: NextFunction) {
  res.send();
}
