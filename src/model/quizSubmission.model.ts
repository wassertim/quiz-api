/**
 * Quiz
 * Small Quiz Api
 *
 * The version of the OpenAPI document: 1.0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */
import { QuestionAndAnswers } from './questionAndAnswers.model';


export interface QuizSubmission { 
    id?: string;
    quizId?: string;
    questionsAndAnswers?: Array<QuestionAndAnswers>;
}

