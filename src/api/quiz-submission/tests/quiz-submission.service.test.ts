import { ok } from "neverthrow";
import { QuizSubmissions } from "../../../db";
import { getMockedCollection } from "../../../test/mongo.mock";
import { insertQuizSubmission } from "../../../api/quiz-submission/quiz-submission.service";

jest.mock("../../../db");

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
