import { ObjectId } from "bson";
import { err, ok } from "neverthrow";
import { QuizSubmissions, Quizzes } from "../../db";
import { ApiError } from "../../types/errors";
import { buildStatistics } from "./quiz-statistics.reducer";

export async function findQuizStatistics(quizId: string) {
    try {
        const quiz = await Quizzes().findOne({ _id: ObjectId.createFromHexString(quizId) });
        const quizAttempts = (await QuizSubmissions().find({ quizId }).toArray()).map((qs: any) => ({
            ...qs,
            id: qs._id + "",
        }));

        if (!quiz || !quizAttempts) {
            return err({ code: ApiError.UNKNOWN_ERROR, message: "No statistics" });
        }
        const stat = buildStatistics({ ...quiz, id: quizId }, quizAttempts);

        return ok(stat);
    } catch (e) {
        return err({ code: ApiError.UNKNOWN_ERROR, message: "No statistics" });
    }
}
