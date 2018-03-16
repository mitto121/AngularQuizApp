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

  @Input()
  isReadOnly: boolean;

  @Output() onSelect: EventEmitter<Iquestion> = new EventEmitter();


  constructor() { }

  ngOnInit() {
  }

  selectAnswer(option: Ioption) {
    this.question.options.forEach((x) => { x.isSelected = (x.code == option.code); });
    this.onSelect.emit(this.question);
  }


}
