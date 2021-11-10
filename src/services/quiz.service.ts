import { ObjectId, ReturnDocument } from "mongodb";
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

export async function editQuiz(quizId: string, quiz: Quiz) {
    const validationResult = validate(quiz);
    if (validationResult.isOk()) {
        try {
            const validQuiz = validationResult.value;
            const result = await Quizzes().findOneAndUpdate(
                { _id: ObjectId.createFromHexString(quizId), createdBy: quiz.createdBy },
                { $set: validQuiz },
                { returnDocument: ReturnDocument.AFTER }
            );
            if (result.ok) {
                return ok(result.value as Quiz);
            }
            return err({ code: QuizErrors.UNKNOWN_ERROR, message: `Could not update the quiz at id ${quizId}` });
        } catch (e) {
            return err({ code: QuizErrors.UNKNOWN_ERROR, message: e + "" });
        }
    }

    return validationResult;
}
