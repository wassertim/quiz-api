import {Router} from "express";
import {addQuiz} from "../controllers/quiz.controller";
import {withAuth} from "../middleware/passport";

export default Router()
    .post("/", withAuth, addQuiz);
    // .put("/:quizId/", withAuth, editQuiz);
