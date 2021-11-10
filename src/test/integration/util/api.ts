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

    return response.body;
}
