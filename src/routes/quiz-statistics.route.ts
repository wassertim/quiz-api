import { Router } from "express";
import { getQuizStatistics } from "../controllers/quiz-statistics.controller";

export const quizStatisticsRoute = Router()
    .get("/:quizId", getQuizStatistics);
