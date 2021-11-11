import { Router } from "express";
import { addQuiz, updateQuiz } from "./quiz.controller";
import { authorize } from "../../middleware/authorize";
import { withAuth } from "../../middleware/passport";

export const quizRouter = Router()
    .post("/", withAuth, addQuiz)
    .put("/:quizId/", withAuth, authorize, updateQuiz);
