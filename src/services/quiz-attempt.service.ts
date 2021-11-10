import { err, ok } from "neverthrow";
import { QuizAttempts } from "../db";
import { QuizSubmission } from "../model";
import { QuizErrors } from "../types/errors";
import { quizSubmissionSchema } from "../validators/quiz-attempt.validator";

export async function createQuizAttempt(quiz: QuizSubmission) {
    const validationResult = quizSubmissionSchema.validate(quiz);
    if (validationResult.error) {
        return err({ code: QuizErrors.VALIDATION_ERROR, message: validationResult.error.message });
    }

    try {
        const validQuizSubmission = validationResult.value;
        const result = await QuizAttempts().insertOne(validQuizSubmission);

        return ok({ ...validQuizSubmission, id: result.insertedId + "" });
    } catch (e) {
        return err({ code: QuizErrors.UNKNOWN_ERROR, message: e + "" });
    }
}
