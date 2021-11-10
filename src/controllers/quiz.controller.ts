import { Request, Response } from "express";
import { Quiz, User } from "../model";
import { constants } from "http2";
import { createQuiz, editQuiz } from "../services/quiz.service";
import { QuizErrors } from "../types/errors";

const codeMap = {} as Record<QuizErrors, number>;
codeMap[QuizErrors.VALIDATION_ERROR] = constants.HTTP_STATUS_BAD_REQUEST;

export async function addQuiz(req: Request<unknown, unknown, Quiz>, res: Response<Quiz | string>) {
    return (await createQuiz({ ...req.body, createdBy: (<User>req.user).login! }))
        .map((quiz) => res.status(constants.HTTP_STATUS_CREATED).send(quiz))
        .mapErr((err) => res.status(codeMap[err.code] || constants.HTTP_STATUS_INTERNAL_SERVER_ERROR).send(err.message))
        .unwrapOr(() => res.status(constants.HTTP_STATUS_INTERNAL_SERVER_ERROR).send("Unknown Error"));
}

export async function updateQuiz(req: Request<Record<string, string>, unknown, Quiz>, res: Response<Quiz | string>) {
    return (await editQuiz(req.params.quizId, { ...req.body, createdBy: (<User>req.user).login! }))
        .map((quiz) => res.status(constants.HTTP_STATUS_OK).send(quiz))
        .mapErr((err) => res.status(codeMap[err.code] || constants.HTTP_STATUS_INTERNAL_SERVER_ERROR).send(err.message))
        .unwrapOr(() => res.status(constants.HTTP_STATUS_INTERNAL_SERVER_ERROR).send("Unknown Error"));
}
