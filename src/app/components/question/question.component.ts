import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { Iquestion } from '../../models/iquestion';
import { Ioption } from '../../models/ioption';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit {


  @Input()
  question: Iquestion;

  @Input()
  questionNumber: number;

  optionType: string;

  @Input()
  isReadOnly: boolean;


  @Output() onSelect: EventEmitter<Iquestion> = new EventEmitter();


  constructor() {
    this.optionType = 'checkbox';
  }

  ngOnInit() {   
    let hasMultipleChoice = this.question.options.filter(x => x.isAnswer).length;
    if (hasMultipleChoice && hasMultipleChoice == 1) {
      this.optionType = 'radio';
    }
  }

  selectAnswer(option: Ioption,event) {    
    if (this.optionType == 'checkbox') {
      this.question.options.find(x => x.code == option.code).isSelected = event.target.checked;
    }
    else {
      this.question.options.forEach(x => x.isSelected = (x.code == option.code));
    }
    this.onSelect.emit(this.question);
  }


}
