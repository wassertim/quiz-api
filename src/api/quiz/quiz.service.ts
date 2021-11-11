import { ObjectId, ReturnDocument } from "mongodb";
import { err, ok } from "neverthrow";
import { Quizzes } from "../../db";
import { Quiz } from "../../model/quiz.model";
import { ApiError, ServiceError } from "../../errors/errors";

export async function createQuiz(quiz: Quiz) {
    try {
        const result = await Quizzes().insertOne(quiz);

        return ok({ ...quiz, id: result.insertedId + "" } as Quiz);
    } catch (e) {
        return err({ code: ApiError.UNKNOWN_ERROR, message: e + "" } as ServiceError);
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
            code: ApiError.UNKNOWN_ERROR,
            message: `Could not update the quiz at id ${quizId}`,
        } as ServiceError);
    } catch (e) {
        return err({ code: ApiError.UNKNOWN_ERROR, message: e + "" } as ServiceError);
    }
}
