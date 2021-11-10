import { Request, Response } from "express";
import { err, ok } from "neverthrow";
import { mockResponse } from "./util/mock";
import { constants } from "http2";
import { mocked } from "ts-jest/utils";
import { createQuizAttempt } from "../../../services/quiz-attempt.service";
import { submitQuizAttempt } from "../../../controllers/quiz-attempt.controller";

jest.mock("../../../services/quiz-attempt.service");

describe("Quiz API", () => {
    test("Should return created", async () => {
        const quizSubmission = {};
        const req = { body: quizSubmission, user: { login: "laura" } as any } as Request;
        const response = mockResponse();
        const mockedCreateQuizAttempt = mocked(createQuizAttempt, true);
        mockedCreateQuizAttempt.mockResolvedValue(ok(quizSubmission));

        await submitQuizAttempt(req, response as Response);

        expect(response.status).toBeCalledWith(constants.HTTP_STATUS_CREATED);
        expect(response.send).toBeCalledWith(quizSubmission);
    });
});
