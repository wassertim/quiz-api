import { Quiz, QuizSubmission } from "../../../model";
import { buildStatistics } from "../../../reducers/quiz.statistics.reducer";

const quiz: Quiz = {
    id: "asdf",
    questions: [
        {
            questionScore: 5,
            questionText: "Yes?",
            answers: [
                {
                    isCorrect: true,
                    text: "yes",
                },
                {
                    isCorrect: false,
                    text: "no",
                },
            ],
        },
        {
            questionScore: 2,
            questionText: "Question 2",
            answers: [
                {
                    isCorrect: true,
                    text: "yes",
                },
                {
                    isCorrect: false,
                    text: "no",
                },
            ],
        },
    ],
};

const qs: QuizSubmission = {
    quizId: "asdf",
    questionsAndAnswers: [
        {
            questionIndex: 0,
            answerIndicies: [0],
        },
        {
            questionIndex: 1,
            answerIndicies: [2],
        },
    ],
};

describe("Statistics", () => {
    test("should map", () => {
        const stat = buildStatistics(quiz, [qs]);

        expect(stat).toBeDefined(); // TODO: Make proper assertion
    });
});
