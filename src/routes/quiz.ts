import {Router} from "express";
import {addQuiz} from "../controllers/quiz";
import {withAuth} from "../passport/verify";

export default Router()
    .post("/", withAuth, addQuiz);
