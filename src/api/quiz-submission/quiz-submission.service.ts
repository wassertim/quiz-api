import { err, ok } from "neverthrow";
import { QuizSubmissions } from "../../db";
import { QuizSubmission } from "../../model";
import { QuizErrors } from "../../types/errors";
import { quizSubmissionSchema } from "./quiz-submission.schema";

export async function insertQuizSubmission(quiz: QuizSubmission) {
    const validationResult = quizSubmissionSchema.validate(quiz);
    if (validationResult.error) {
        return err({ code: QuizErrors.VALIDATION_ERROR, message: validationResult.error.message });
    }

    try {
        const validQuizSubmission = validationResult.value;
        const result = await QuizSubmissions().insertOne(validQuizSubmission);

        return ok({ ...validQuizSubmission, id: result.insertedId + "" });
    } catch (e) {
        return err({ code: QuizErrors.UNKNOWN_ERROR, message: e + "" });
    }
}
