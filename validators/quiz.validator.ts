import { err, ok } from "neverthrow";
import { Question } from "../model/question";
import { Quiz } from "../model/quiz";
import { QuizErrors } from "../types/errors";

function invalidNumberOfAnswers(questions: Question[]) {
    return !!questions.find((q) => !q.answers || q.answers.length < 2);
}

export function validate(quiz: Quiz) {
    if (!quiz || !quiz.questions || !quiz.questions.length) {
        return err({ code: QuizErrors.VALIDATION_ERROR, message: "Quiz must have at least one question" });
    }
    if (invalidNumberOfAnswers(quiz.questions)) {
        return err({ code: QuizErrors.VALIDATION_ERROR, message: "A question must have at least 2 answers" });
    }

    return ok(quiz);
}