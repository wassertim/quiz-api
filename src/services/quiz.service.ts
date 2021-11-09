import { err, ok } from "neverthrow";
import { Quizzes } from "../db";
import { Quiz } from "../model/quiz.model";
import { QuizErrors } from "../types/errors";
import { validate } from "../validators/quiz.validator";

export async function createQuiz(quiz: Quiz) {
    const validationResult = validate(quiz);
    if (validationResult.isOk()) {
        try {
            const validQuiz = validationResult.value;
            const result = await Quizzes().insertOne(validQuiz);

            return ok({ ...validQuiz, id: result.insertedId + "" });
        } catch (e) {
            return err({ code: QuizErrors.UNKNOWN_ERROR, message: e + "" });
        }
    }

    return validationResult;
}

export async function editQuiz(quiz: Quiz) {
    const validationResult = validate(quiz);
    if (validationResult.isOk()) {
        try {
            const validQuiz = validationResult.value;
            const result = await Quizzes().updateOne({ _id: quiz.id, createdBy: quiz.createdBy }, { $set: validQuiz });

            return ok(validQuiz);
        } catch (e) {
            return err({ code: QuizErrors.UNKNOWN_ERROR, message: e + "" });
        }
    }

    return validationResult;
}
