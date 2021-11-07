import {Router} from "express";
import {addQuiz} from "../controllers/quiz";

export default Router()
    .post("/", addQuiz);
