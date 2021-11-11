export interface QuestionResult { 
    questionId?: string;
    score: number;
    questionIndex: number;
    isCorrect: boolean;
    questionText: string;
    completed: boolean;
}

