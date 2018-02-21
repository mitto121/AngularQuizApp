import { Component, OnInit, Input } from '@angular/core';
import { Iquestion } from '../../models/iquestion';

@Component({
  selector: 'app-question-result-stutas-bar',
  templateUrl: './question-result-stutas-bar.component.html',
  styleUrls: ['./question-result-stutas-bar.component.css']
})
export class QuestionResultStutasBarComponent implements OnInit {


  answer: string;
  viewCorrectAnswer: boolean;
  @Input()
  question: Iquestion;

  constructor() { }

  ngOnInit() {
  }
  isCorrectAnswer(): boolean {
    return this.question.options.every((x) => x.isAnswer == x.isSelected);
   }

   showCorrectAnswer() {
     const buttonId = this.question.id.toString();
     let name = document.getElementById(buttonId).innerText;
     this.answer = this.question.options.find(x => x.isAnswer).name;
     this.viewCorrectAnswer = !this.viewCorrectAnswer;
     name = this.viewCorrectAnswer ? 'Hide Answer' : 'Show Answer';
     document.getElementById(buttonId).innerHTML = name;
   }
}
