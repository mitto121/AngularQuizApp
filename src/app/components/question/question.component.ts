import { Component, Input, OnInit } from '@angular/core';
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

  

  constructor() { }

  ngOnInit() {
  }  

  onSelect(option: Ioption) {
    this.question.options.forEach((x) => { x.isSelected = (x.id == option.id); });
    this.question.isAttempt = true;
  }
  

}
