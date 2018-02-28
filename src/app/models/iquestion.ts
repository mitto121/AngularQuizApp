import { Ioption } from './ioption';

export interface Iquestion {
    id: number;
    name: string;
    QuizId: number;
    options: Ioption[];
    isAttempt: boolean;
    isActive:boolean;
}
