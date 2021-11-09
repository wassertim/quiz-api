import Joi from "joi";
import { Answer } from "../../model/answer";

export const answerSchema = Joi.object<Answer>({
    isCorrect: Joi.boolean().required(),
    text: Joi.string().min(1).required(),
});