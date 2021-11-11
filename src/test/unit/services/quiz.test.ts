import { err, ok } from "neverthrow";
import { Quizzes } from "../../../db";
import { createQuiz } from "../../../api/quiz/quiz.service";
import { QuizErrors } from "../../../types/errors";
import { getMockedCollection } from "./util/mock";
import { mocked } from "ts-jest/utils";
import { quizSchema } from "../../../api/quiz/quiz.schema";
import { ValidationError, ValidationResult } from "joi";

jest.mock("../../../db");
jest.mock("../../../api/quiz/quiz.schema");

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
        mocked(quizSchema.validate).mockReturnValue({
            value: quiz
        } as ValidationResult);

        const result = await createQuiz(quiz);

        expect(result).toStrictEqual(ok({ ...quiz, id: "42" }));
    });
    test("Should return err when invalid quiz", async () => {
        const quiz = {};
        const mockUserCollection = getMockedCollection(Quizzes);
        const errorMessage = "Some validation error";
        mockUserCollection.insertOne = jest.fn().mockImplementation(() => ({ ...quiz, insertedId: 42 }));        
        mocked(quizSchema.validate).mockReturnValue({
            error: {
                message: errorMessage
            } as ValidationError                      
        } as ValidationResult);

        const result = await createQuiz(quiz);

        expect(result).toStrictEqual(err({ code: QuizErrors.VALIDATION_ERROR, message: errorMessage }));
    });
});
