import { Router } from "express";
import { postQuizSubmission } from "./quiz-submission.controller";
import { validateQuizSubmission } from "./quiz-submission.validator";

export const quizSubmissionsRoute = Router()
    .post("/", validateQuizSubmission, postQuizSubmission);