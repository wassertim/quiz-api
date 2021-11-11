import { Router } from "express";
import { addQuiz, updateQuiz } from "./quiz.controller";
import { authorize } from "../../middleware/authorize";
import { withAuth } from "../../middleware/passport";
import { validateQuiz } from "./quiz.validator";

export const quizRouter = Router()
    .post("/", withAuth, validateQuiz, addQuiz)
    .put("/:quizId/", validateQuiz, withAuth, authorize, updateQuiz);
