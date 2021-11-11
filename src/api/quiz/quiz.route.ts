import { Router } from "express";
import { addQuiz, updateQuiz } from "./quiz.controller";
import { withAuthorization } from "../../middleware/authorize";
import { withAuthentication } from "../../middleware/passport";
import { getValidator } from "../../middleware/validator";
import { quizSchema } from "./quiz.schema";

const withValidation = getValidator(quizSchema);

export const quizRouter = Router()
    .post("/", withAuthentication, withValidation, withAuthorization, addQuiz)
    .put("/:quizId/", withValidation, withAuthentication, withAuthorization, updateQuiz);
