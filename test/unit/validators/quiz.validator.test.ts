import { validate } from "../../../validators/quiz.validator";

describe("Quiz Validator", () => {
    test("Should return an error when empty quiz", async () => {
        const quiz = {};

        const result = validate(quiz);

        // expect(result).toStrictEqual(error);
    });
});
