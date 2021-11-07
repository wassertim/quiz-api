import {Request, Response} from "express";
import {QuizTemplate} from "../model/quizTemplate";

export function addQuiz(req: Request<unknown, unknown, QuizTemplate>, res: Response<QuizTemplate | string>) {
  return null;
}
