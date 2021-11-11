import { NextFunction, Request, Response } from "express";
import { constants } from "http2";
import { quizSubmissionSchema } from "./quiz-submission.schema";

export const validateQuizSubmission = (req: Request, res: Response, next: NextFunction) => {
    const validationResult = quizSubmissionSchema.validate(req.body);
    if (validationResult.error) {
        return res.status(constants.HTTP_STATUS_BAD_REQUEST).send(validationResult.error.message);
    }
    req.body = validationResult.value;

    return next();
}