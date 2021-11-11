import { ObjectId } from "bson";
import { err, ok } from "neverthrow";
import { QuizSubmissions, Quizzes } from "../db";
import { buildStatistics } from "../reducers/quiz.statistics.reducer";
import { QuizErrors } from "../types/errors";

export async function findQuizStatistics(quizId: string) {    
    try {        
        const quiz = await Quizzes().findOne({_id: ObjectId.createFromHexString(quizId)});
        const quizAttempts = (await (await QuizSubmissions().find({quizId}).toArray())).map((qs: any) => {
            return {...qs, id: qs._id + ""};
        });

        if (!quiz || !quizAttempts) {
            return err({ code: QuizErrors.UNKNOWN_ERROR, message: "No statistics" });
        }
        const stat = buildStatistics({...quiz, id: quizId}, quizAttempts);
                
        return ok(stat);
    } catch (e) {
        return err({ code: QuizErrors.UNKNOWN_ERROR, message: "No statistics" });
    }
}
