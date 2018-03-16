import { Pipe, PipeTransform } from '@angular/core';
import { QuizMaster } from '../models/quiz-master';
import { Question } from '../models/question';

@Pipe({
  name: 'questionFilter'
})
export class QuestionFilterPipe implements PipeTransform {

  transform(value: Question[], filterBy: string, aa): Question[] {
    filterBy = (filterBy) ? filterBy.toLowerCase() : null;

    return filterBy ? value.filter(
      (question: Question) => question.name.toLowerCase().indexOf(filterBy) !== -1
    ) : value;
  }

}
