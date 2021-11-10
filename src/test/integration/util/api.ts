import request from "supertest";
import { app } from "../../../app";
import { Quiz } from "../../../model";
import { User } from "../../../model/user.model";

export async function registerUser(user: User) {
    await request(app).post("/users/register").send(user);
}

export async function login(user: User) {
    return (await request(app).post("/users/login").send(user)).text;
}

export async function createQuiz(login: string, token: string, quiz: Quiz) {
    const response = await request(app).post(`/profiles/${login}/quizzes`).set({ Authorization: token }).send(quiz);

    return response.body as Quiz;
}

export const testQuiz = {
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
} as Quiz;
