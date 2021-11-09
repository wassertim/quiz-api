import { err, ok } from "neverthrow";
import { Quiz } from "../model/quiz";
import { QuizErrors } from "../types/errors";
import { quizSchema } from "./schemas/quiz.schema";

export function validate(quiz: Quiz) {
    const result = quizSchema.validate(quiz);
    if (result.error) {
        return err({ code: QuizErrors.VALIDATION_ERROR, message: result.error.message });
    }

    return ok(result.value);
}
