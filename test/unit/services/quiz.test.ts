import { err, ok } from "neverthrow";
import { Quizzes } from "../../../db";
import { createQuiz } from "../../../services/quiz";
import { QuizErrors } from "../../../types/errors";
import { getMockedCollection } from "./util/mock";
import { validate } from "../../../validators/quiz.validator";
import { mocked } from "ts-jest/utils";

jest.mock("../../../db");
jest.mock("../../../validators/quiz.validator");

describe("Quiz Service Create Quiz", () => {
    test("Should return ok with quiz", async () => {
        const quiz = {
            questions: [
                {
                    questionText: "what is the answer to life the universe and everything",
                    questionScore: 5,
                    answers: [
                        {
                            text: "42",
                            isCorrect: true,
                        },
                        {
                            text: "41",
                            isCorrect: false,
                        },
                    ],
                },
            ],
        };
        const mockUserCollection = getMockedCollection(Quizzes);
        mockUserCollection.insertOne = jest.fn().mockImplementation(() => ({ ...quiz, insertedId: 42 }));
        mocked(validate).mockReturnValue(ok(quiz));        

        const result = await createQuiz(quiz);

        expect(result).toStrictEqual(ok({ ...quiz, id: "42" }));
    });
    test("Should return err when no invalid quiz", async () => {
        const quiz = {};
        const mockUserCollection = getMockedCollection(Quizzes);
        mockUserCollection.insertOne = jest.fn().mockImplementation(() => ({ ...quiz, insertedId: 42 }));
        const error = err({ code: QuizErrors.VALIDATION_ERROR, message: "Some validation error" });
        mocked(validate).mockReturnValue(error);

        const result = await createQuiz(quiz);

        expect(result).toStrictEqual(error);
    });
});
