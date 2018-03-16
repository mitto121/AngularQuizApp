import { Pipe, PipeTransform } from '@angular/core';
import { QuizMaster } from '../models/quiz-master';

@Pipe({
  name: 'quizFilter'
})
export class QuizFilterPipe implements PipeTransform {

  transform(value: QuizMaster[], filterBy: string): QuizMaster[] {

    filterBy = (filterBy) ? filterBy.trim().toLowerCase() : null;

    return filterBy ? value.filter(
      (quiz: QuizMaster) => quiz.name.toLowerCase().indexOf(filterBy) !== -1
      || quiz.description.toLowerCase().indexOf(filterBy) !== -1
    ) : value;
  }

}
