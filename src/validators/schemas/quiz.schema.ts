import Joi from "joi";
import { Quiz } from "../../model/quiz.model";
import { questionSchema } from "./question.schema";

export const quizSchema = Joi.object<Quiz>({
    questions: Joi.array().min(1).items(questionSchema).required(),
});