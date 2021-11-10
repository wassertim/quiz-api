import { err, ok } from "neverthrow";
import { QuizAttempts } from "../../../db";
import { createQuiz } from "../../../services/quiz.service";
import { QuizErrors } from "../../../types/errors";
import { getMockedCollection } from "./util/mock";
import { validate } from "../../../validators/quiz.validator";
import { mocked } from "ts-jest/utils";
import { createQuizAttempt } from "../../../services/quiz-attempt.service";

jest.mock("../../../db");
jest.mock("../../../validators/quiz.validator");

describe("Quiz Service Create Quiz", () => {
    test("Should return ok with quiz", async () => {
        const quizSubmission = {
            quizId: "618c05f4236ff44323b8dd9e"
        };
        const mockUserCollection = getMockedCollection(QuizAttempts);
        mockUserCollection.insertOne = jest.fn().mockImplementation(() => ({ ...quizSubmission, insertedId: 42 }));
        mocked(validate).mockReturnValue(ok(quizSubmission));

        const result = await createQuizAttempt(quizSubmission);

        expect(result).toStrictEqual(ok({ ...quizSubmission, id: "42" }));
    });
});
