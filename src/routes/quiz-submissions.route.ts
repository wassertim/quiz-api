import { Router } from "express";
import { postQuizSubmission } from "../controllers/quiz-submissions.controller";

export const quizSubmissionsRoute = Router()
    .post("/", postQuizSubmission);