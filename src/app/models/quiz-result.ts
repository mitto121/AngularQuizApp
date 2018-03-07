import { QuizMaster } from "./quiz-master";

export class QuizResult extends QuizMaster
{
    constructor(){
        super();
    }
    totalQuestions:number;
    attemptDate:string;
    totalQuestionsAttempt:number;
    totalCorrectAnswer:number;
    totalWrongAnswer:number;
    resultStatus:string;    

}