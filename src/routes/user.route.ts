import {Router} from "express";
import {register, login} from "../controllers/users.controller";

export const usersRoute = Router()
    .post("/register", register)
    .post("/login", login);
