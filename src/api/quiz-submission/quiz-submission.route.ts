import { Router } from "express";
import { postQuizSubmission } from "./quiz-submission.controller";

export const quizSubmissionsRoute = Router()
    .post("/", postQuizSubmission);