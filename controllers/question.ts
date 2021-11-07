import {Request, Response} from "express";
import {constants} from "http2";
import {Question} from "../model/question";
import {createQuestion} from "../services/question";

export async function addQuestion(req: Request<unknown, unknown, Question>, res: Response<Question | string>) {
  return (await createQuestion(req.body))
      .map(question => res.status(constants.HTTP_STATUS_OK).send(question))
      .mapErr(e => res.status(constants.HTTP_STATUS_INTERNAL_SERVER_ERROR).send(e.message))
      .unwrapOr(() => res.sendStatus(constants.HTTP_STATUS_INTERNAL_SERVER_ERROR));
}
