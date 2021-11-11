import { Request, Response } from "express";
import { QuizStatistics } from "../../model";
import { findQuizStatistics } from "./quiz-statistics.service";

export async function getQuizStatistics(req: Request, res: Response<unknown | string>) {
    const stat = await findQuizStatistics(req.params.quizId);
    res.send(stat);
}