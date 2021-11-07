import {Router} from "express";
import {withAuth} from "../passport/verify";
import {addQuestion} from "../controllers/question";

export default Router()
    .post("/", withAuth, addQuestion);
