import {Router} from "express";
import {register, login} from "./user.controller";

export const usersRoute = Router()
    .post("/register", register)
    .post("/login", login);
