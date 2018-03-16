import { QuizMaster } from './quiz-master';

export class QuizResult extends QuizMaster {

    totalQuestions: number;
    attemptDate: string;
    totalQuestionsAttempt: number;
    totalCorrectAnswer: number;
    totalWrongAnswer: number;
    resultStatus: string;
    marksInPercentage: number;
}
