import { Request, Response } from "express";
import { ok } from "neverthrow";
import { mockResponse } from "./util/mock";
import { constants } from "http2";
import { mocked } from "ts-jest/utils";
import { insertQuizSubmission } from "../../../api/quiz-submission/quiz-submission.service";
import { postQuizSubmission } from "../../../api/quiz-submission/quiz-submission.controller";

jest.mock("../../../api/quiz-submission/quiz-submission.service");

describe("Quiz API", () => {
    test("Should return created", async () => {
        const quizSubmission = {};
        const req = { body: quizSubmission, user: { login: "laura" } as any } as Request;
        const response = mockResponse();
        const mockedCreateQuizAttempt = mocked(insertQuizSubmission, true);
        mockedCreateQuizAttempt.mockResolvedValue(ok(quizSubmission));

        await postQuizSubmission(req, response as Response);

        expect(response.status).toBeCalledWith(constants.HTTP_STATUS_CREATED);
        expect(response.send).toBeCalledWith(quizSubmission);
    });
});
