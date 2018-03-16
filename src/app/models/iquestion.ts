import { Ioption } from './ioption';

export interface Iquestion {
    id: number;
    name: string;
    quizId: number;
    options: Ioption[];
    isAttempt: boolean;
    isActive: boolean;
    isSelected: boolean;
}
