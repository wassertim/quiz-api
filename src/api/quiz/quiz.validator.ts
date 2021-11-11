import { NextFunction, Request, Response } from "express";
import { constants } from "http2";
import { quizSchema } from "./quiz.schema";

export const validateQuiz = (req: Request, res: Response, next: NextFunction) => {
    const validationResult = quizSchema.validate(req.body);
    if (validationResult.error) {
        return res.status(constants.HTTP_STATUS_BAD_REQUEST).send(validationResult.error.message);
    }
    req.body = validationResult.value;

    return next();
}