import { Ioption } from './ioption';

export class Question {
    id: number;
    name: string;
    QuizId: number;
    options: Ioption[];
    isAttempt: boolean;

}
