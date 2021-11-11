import { ok } from "neverthrow";
import { QuizSubmissions } from "../../../db";
import { getMockedCollection } from "./util/mock";
import { insertQuizSubmission } from "../../../services/quiz-submission.service";

jest.mock("../../../db");
jest.mock("../../../validators/quiz.validator");

describe("Quiz Submission Service", () => {
    test("Should return ok with quiz submission", async () => {
        const quizSubmission = {
            quizId: "618c05f4236ff44323b8dd9e",
        };
        const mockUserCollection = getMockedCollection(QuizSubmissions);
        mockUserCollection.insertOne = jest.fn().mockImplementation(() => ({ ...quizSubmission, insertedId: 42 }));        

        const result = await insertQuizSubmission(quizSubmission);

        expect(result).toStrictEqual(ok({ ...quizSubmission, id: "42" }));
    });
});