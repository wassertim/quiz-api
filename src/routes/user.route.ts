import {Router} from "express";
import {register, login} from "../controllers/user.controller";

export default Router()
    .post("/register", register)
    .post("/login", login);
