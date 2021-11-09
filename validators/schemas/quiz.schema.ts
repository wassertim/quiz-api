import Joi from "joi";
import { Quiz } from "../../model/quiz";
import { questionSchema } from "./question.schema";

export const quizSchema = Joi.object<Quiz>({
    questions: Joi.array().min(1).items(questionSchema).required(),
});