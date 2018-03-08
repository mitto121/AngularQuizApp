import { Ioption } from './ioption';

export class Question {
    id: number;
    name: string;
    quizId: number;
    options: Ioption[];
    isAttempt: boolean;
    isActive:boolean;
    isSelected:boolean;
}
