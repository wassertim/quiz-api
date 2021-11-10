import { Router } from "express";
import { addQuiz, updateQuiz } from "../controllers/quiz.controller";
import { authorize } from "../middleware/authorize";
import { withAuth } from "../middleware/passport";

export default Router()
    .post("/", withAuth, addQuiz)
    .put("/:quizId/", withAuth, authorize, updateQuiz);
