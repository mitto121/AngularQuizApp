import { Iquestion } from './iquestion';

export class QuizMaster {
    id: number;
    name: string;
    description: string; 
    duration:number;
    passingPercentage:number;  
    isActive:boolean;
    questions: Iquestion[];
    hasAttempt: boolean;
  
}
