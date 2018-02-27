import { Component, OnInit} from '@angular/core';
import {Location} from '@angular/common';

@Component({
  selector: 'app-add-quiz',
  templateUrl: './add-quiz.component.html',
  styleUrls: ['./add-quiz.component.css']
})
export class AddQuizComponent implements OnInit {

  constructor(private _location:Location) { }

  ngOnInit() {
  }

  addQuiz() {
    
   this._location.back();
  }

}
  

