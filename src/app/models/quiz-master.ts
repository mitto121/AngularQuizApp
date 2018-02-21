import { Iquestion } from './iquestion';

export class QuizMaster {
    id: number;
    name: string;
    description: string;
    duration: number;
    questions: Iquestion[];
    hasAttempt: boolean;
}
