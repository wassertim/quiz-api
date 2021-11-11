import { Request, Response } from "express";
import { QuizSubmission, QuizSubmissionResult, User } from "../model";
import { constants } from "http2";
import { insertQuizSubmission } from "../services/quiz-submission.service";
import { QuizErrors } from "../types/errors";

const codeMap = {} as Record<QuizErrors, number>;
codeMap[QuizErrors.VALIDATION_ERROR] = constants.HTTP_STATUS_BAD_REQUEST;

export async function postQuizSubmission(req: Request<unknown, unknown, QuizSubmission>, res: Response<QuizSubmissionResult | string>) {
    return (await insertQuizSubmission(req.body))
        .map((quizSubmissionResult) => res.status(constants.HTTP_STATUS_CREATED).send(quizSubmissionResult))
        .mapErr((err) => res.status(codeMap[err.code] || constants.HTTP_STATUS_INTERNAL_SERVER_ERROR).send(err.message))
        .unwrapOr(() => res.status(constants.HTTP_STATUS_INTERNAL_SERVER_ERROR).send("Unknown Error"));
}