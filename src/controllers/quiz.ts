import { Request, Response } from "express";
import { Quiz } from "../model/quiz";
import { constants } from "http2";
import { createQuiz } from "../services/quiz";

export async function addQuiz(req: Request<unknown, unknown, Quiz>, res: Response<Quiz | string>) {
    return (await createQuiz(req.body))
        .map((quiz) => res.status(constants.HTTP_STATUS_CREATED).send(quiz))
        .mapErr((err) => res.status(constants.HTTP_STATUS_INTERNAL_SERVER_ERROR).send(err.message))
        .unwrapOr(() => res.status(constants.HTTP_STATUS_INTERNAL_SERVER_ERROR).send("Unknown Error"));    
}
