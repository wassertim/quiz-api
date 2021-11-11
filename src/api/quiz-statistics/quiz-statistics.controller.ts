import { Request, Response } from "express";
import { findQuizStatistics } from "./quiz-statistics.service";

export async function getQuizStatistics(req: Request, res: Response<unknown | string>) {
    // TODO: Make proper error handling
    const stat = await findQuizStatistics(req.params.quizId);
    res.send(stat);
}