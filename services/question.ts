import {err, ok, Result} from "neverthrow";
import {ServiceError} from "../types/errors";
import {Question} from "../model/question";
import {Questions} from "../db";

export enum QuestionErrors {
  UNKNOWN_ERROR
}

export async function createQuestion(question: Question): Promise<Result<Question, ServiceError<QuestionErrors>>> {
  try {
    const result = await Questions().insertOne(question);

    return ok({...question, id: result.insertedId.toString()});
  } catch (e) {
    return err({code: QuestionErrors.UNKNOWN_ERROR, message: e + ''});
  }
}
