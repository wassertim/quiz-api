import Joi from "joi";
import { Question } from "../../model/question.model";
import { answerSchema } from "./answer.schema";

export const questionSchema = Joi.object<Question>({
    questionText: Joi.string().min(2).required(),
    questionScore: Joi.number().min(1).empty().default(1),
    answers: Joi.array().min(2).items(answerSchema),
});