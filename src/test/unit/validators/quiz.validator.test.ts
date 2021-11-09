import { err, ok } from "neverthrow";
import { Question } from "../../../model/question.model";
import { QuizErrors } from "../../../types/errors";
import { validate } from "../../../validators/quiz.validator";

describe("Quiz Validator", () => {
    test("Should return an error when invalid quiz", async () => {
        const quiz = {
            questions: [{}],
        };

        const result = validate(quiz);

        expect(result).toStrictEqual(
            err({ code: QuizErrors.VALIDATION_ERROR, message: '"questions[0].questionText" is required' })
        );
    });
    test("Should return an ok with value when valid quiz", async () => {
        const quiz = {
            questions: [
                {
                    questionText: "Some text",
                },
            ],
        };

        const result = validate(quiz);

        expect(result).toStrictEqual(
            ok({
                questions: [
                    {
                        questionText: "Some text",
                        questionScore: 1,
                    },
                ],
            })
        );
    });
});
