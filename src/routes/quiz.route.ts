import { NextFunction, Request, Response, Router } from "express";
import { constants } from "http2";
import { addQuiz, updateQuiz } from "../controllers/quiz.controller";
import { withAuth } from "../middleware/passport";
import { User } from "../model";

const authorize = (req: Request, res: Response, next: NextFunction) => {
    if ((<User>req.user).login !== (req as any).baseUrlParams.login) {
        return res.status(constants.HTTP_STATUS_UNAUTHORIZED).send("You are not authorized to update this resource");
    }
    return next();
};

export default Router()
    .post("/", withAuth, addQuiz)
    .put("/:quizId/", withAuth, authorize, updateQuiz);
