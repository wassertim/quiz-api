import { err, ok } from "neverthrow";
import { Quizzes } from "../db";
import { Quiz } from "../model/quiz.model";
import { QuizErrors } from "../types/errors";
import { validate } from "../validators/quiz.validator";

export async function createQuiz(quiz: Quiz) {
    const validationResult = validate(quiz);
    if (validationResult.isOk()) {
        try {
            const result = await Quizzes().insertOne(quiz);
    
            return ok({ ...quiz, id: result.insertedId + "" });
        } catch (e) {
            return err({ code: QuizErrors.UNKNOWN_ERROR, message: e + "" });
        }
    }

    return validationResult;
    
}
