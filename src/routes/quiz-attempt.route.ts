import { Router } from "express";
import { submitQuizAttempt } from "../controllers/quiz-attempt.controller";

export const quizAttemptRoute = Router()
    .post("/", submitQuizAttempt);