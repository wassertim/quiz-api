import { ObjectId, ReturnDocument } from "mongodb";
import { err, ok } from "neverthrow";
import { Quizzes } from "../../db";
import { Quiz } from "../../model/quiz.model";
import { QuizErrors, ServiceError } from "../../types/errors";

export async function createQuiz(quiz: Quiz) {
    try {
        const result = await Quizzes().insertOne(quiz);

        return ok({ ...quiz, id: result.insertedId + "" } as Quiz);
    } catch (e) {
        return err({ code: QuizErrors.UNKNOWN_ERROR, message: e + "" } as ServiceError<QuizErrors>);
    }
}

export async function editQuiz(quizId: string, quiz: Quiz) {
    try {
        const result = await Quizzes().findOneAndUpdate(
            { _id: ObjectId.createFromHexString(quizId), createdBy: quiz.createdBy },
            { $set: quiz },
            { returnDocument: ReturnDocument.AFTER }
        );
        if (result.ok) {
            return ok(result.value as Quiz);
        }
        return err({
            code: QuizErrors.UNKNOWN_ERROR,
            message: `Could not update the quiz at id ${quizId}`,
        } as ServiceError<QuizErrors>);
    } catch (e) {
        return err({ code: QuizErrors.UNKNOWN_ERROR, message: e + "" } as ServiceError<QuizErrors>);
    }
}