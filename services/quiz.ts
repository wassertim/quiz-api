import { err, ok } from "neverthrow";
import { Quizzes } from "../db";
import { Quiz } from "../model/quiz";

export enum QuizErrors {
    UNKNOWN_ERROR,
}

export async function createQuiz(quiz: Quiz) {
    try {
        const result = await Quizzes().insertOne(quiz);

        return ok({ ...quiz, id: result.insertedId.toString() });
    } catch (e) {
        return err({ code: QuizErrors.UNKNOWN_ERROR, message: e + "" });
    }
}
