import { Request, Response } from "express";
import { err, ok } from "neverthrow";
import { mockResponse } from "./util/mock";
import { constants } from "http2";
import { mocked } from "ts-jest/utils";
import { addQuiz } from "../../../api/quiz/quiz.controller";
import { createQuiz } from "../../../api/quiz/quiz.service";
import { QuizErrors } from "../../../types/errors";

jest.mock("../../../api/quiz/quiz.service");

describe("Quiz API", () => {
    test("Should return created", async () => {
        const quiz = {};
        const req = { body: quiz, user: { login: "laura" } as any } as Request;
        const response = mockResponse();
        const mockedCreateQuiz = mocked(createQuiz, true);
        mockedCreateQuiz.mockResolvedValue(ok(quiz));

        await addQuiz(req, response as Response);

        expect(response.status).toBeCalledWith(constants.HTTP_STATUS_CREATED);
        expect(response.send).toBeCalledWith(quiz);
    });
    test("Should return bad request", async () => {
        const quiz = {};
        const req = { body: quiz, user: { login: "laura" } as any } as Request;
        const response = mockResponse();
        const mockedCreateQuiz = mocked(createQuiz, true);
        mockedCreateQuiz.mockResolvedValue(err({code: QuizErrors.VALIDATION_ERROR, message: "Some validation error"}));

        await addQuiz(req, response as Response);

        expect(response.status).toBeCalledWith(constants.HTTP_STATUS_BAD_REQUEST);
        expect(response.send).toBeCalledWith("Some validation error");
    });
});
