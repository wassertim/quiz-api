import { Router } from "express";
import { addQuiz, updateQuiz } from "./quiz.controller";
import { withAuthorization } from "../../middleware/authorize";
import { withAuthentication } from "../../middleware/passport";
import { validateQuiz } from "./quiz.validator";

export const quizRouter = Router()
    .post("/", withAuthentication, validateQuiz, addQuiz)
    .put("/:quizId/", validateQuiz, withAuthentication, withAuthorization, updateQuiz);
