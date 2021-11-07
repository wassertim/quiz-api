import {Request, Response} from "express";
import {Quiz} from "../model/quiz";
import {constants} from "http2";

export function addQuiz(req: Request<unknown, unknown, Quiz>, res: Response<Quiz | string>) {
  return res.sendStatus(constants.HTTP_STATUS_OK);
}
