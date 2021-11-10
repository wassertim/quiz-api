import { initDatabase } from "./util/init.db";
import { createQuiz, login, registerUser } from "./util/api";
import request from "supertest";
import { app } from "../../app";
import { constants } from "http2";
import { Operation } from "express-openapi-validate/dist/OpenApiDocument";
import { openapi } from "./util/openapi";

describe("Create Quiz API", () => {
    initDatabase();
    const user = { login: "laura", password: "mypassword" };
    beforeEach(() => {
        return registerUser(user);
    });
    test("Should create a quiz", async () => {
        const [method, path] = ["post" as Operation, "/profiles/{login}/quizzes"];
        const token = await login(user);

        const response = await request(app)
            [method](path.replace("{login}", user.login))
            .set({ Authorization: token })
            .send({
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
            });

        expect(openapi.validateResponse(method, path)(response)).toBeUndefined();
        expect(response.statusCode).toBe(constants.HTTP_STATUS_CREATED);
        expect(response.body.createdBy).toBe(user.login);
    });
    test("Should give an error when invalid quiz", async () => {
        const [method, path] = ["post" as Operation, "/profiles/{login}/quizzes"];
        const token = await login(user);

        const response = await request(app)
            [method](path.replace("{login}", user.login))
            .set({ Authorization: token })
            .send({
                questions: [
                    {
                        questionScore: 5,
                        answers: [
                            {
                                text: "42",
                                isCorrect: true,
                            },
                        ],
                    },
                ],
            });

        expect(openapi.validateResponse(method, path)(response)).toBeUndefined();
        expect(response.statusCode).toBe(constants.HTTP_STATUS_BAD_REQUEST);
        expect(response.text).toBe('"questions[0].questionText" is required');
    });
});
describe("Edit Quiz API", () => {
    initDatabase();
    const user = { login: "laura", password: "mypassword" };
    beforeEach(() => {
        return registerUser(user);
    });
    test("Should update a quiz", async () => {
        const [method, path] = ["put" as Operation, "/profiles/{login}/quizzes/{quizId}"];
        const token = await login(user);
        const originalQuiz = {
            questions: [
                {
                    questionText: "what is the answer to life the universe and everything",
                    questionScore: 5,
                    answers: [
                        {
                            text: "2",
                            isCorrect: true,
                        },
                        {
                            text: "15",
                            isCorrect: false,
                        },
                    ],
                },
            ],
        };
        const { id } = await createQuiz(user.login, token, originalQuiz);
        const updatedQuiz = {
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

        const response = await request(app)
            [method](path.replace("{login}", user.login).replace("{quizId}", id))
            .set({ Authorization: token })
            .send(updatedQuiz);

        expect(openapi.validateResponse(method, path)(response)).toBeUndefined();
        expect(response.statusCode).toBe(constants.HTTP_STATUS_OK);
        expect(response.body.questions[0].answers[0].text).toBe(updatedQuiz.questions[0].answers[0].text);
    });
});
