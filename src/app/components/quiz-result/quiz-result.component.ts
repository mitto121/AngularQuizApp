import { Component, Input, OnInit } from '@angular/core';
import { Iquestion } from '../../models/iquestion';

@Component({
  selector: 'app-quiz-result',
  templateUrl: './quiz-result.component.html',
  styleUrls: ['./quiz-result.component.css']
})
export class QuizResultComponent implements OnInit {

  @Input()
  testName: string;

  @Input()
  questions: Iquestion[];


  constructor() { }

  ngOnInit() {
  }



}
