import { Component, OnInit } from '@angular/core';
import { QuizMaster } from '../../models/quiz-master';
import { QuizService } from '../../services/quiz.service';

@Component({
  selector: 'app-quizes',
  templateUrl: './quizes.component.html',
  styleUrls: ['./quizes.component.css']
})
export class QuizesComponent implements OnInit {

  quizes:QuizMaster[];
  filterValue:string;
  openDialog:boolean;

  constructor(private _quiz:QuizService) {
    this.openDialog=false;
   }

  ngOnInit() {
    this._quiz.getQuizes()
    .subscribe(
      (res)=>this.quizes=res,
      (error) =>  console.error(error));
  }

  showModal()
  {    
     this.openDialog=true; 
  }
  closeModal(isShow)
  {
    this.openDialog=isShow; 
  }

}
