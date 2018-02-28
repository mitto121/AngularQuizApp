import { Iquestion } from './iquestion';

export class QuizMaster {
    id: number;
    name: string;
    description: string;   
    isActive:boolean;
    questions: Iquestion[];
    hasAttempt: boolean;
    actionMode:string;
}
