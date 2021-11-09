export interface ServiceError<T> {
  code: T;
  message: string;
}

export enum QuizErrors {
  UNKNOWN_ERROR,
  VALIDATION_ERROR,
}
