import { Component, OnInit, Output } from '@angular/core';
import { QuizMaster } from '../../models/quiz-master';
import { QuizService } from '../../services/quiz.service';

@Component({
  selector: 'app-quizes',
  templateUrl: './quizes.component.html',
  styleUrls: ['./quizes.component.css']
})
export class QuizesComponent implements OnInit {

  quizes: QuizMaster[];
  filterValue: string;
  selectedQuizId:number;
  showModal:boolean;

  constructor(private _quiz: QuizService) {

  }

  ngOnInit() {
    this._quiz.getQuizes()
      .subscribe(
        (res) => this.quizes = res,
        (error) => console.error(error));
  }

  removeQuiz(id: number) {
    if (confirm("Are you sure to delete ")) {
      console.log("Implement delete functionality here");
    }
  }

  editQuiz(id: number) {
      console.log("Implement Edit functionality here");
  }

  setQuestionPaper()
  {
     if(!this.selectedQuizId)
     {
       this.showModal=true;
     }
     else
     {
       console.log('set question paper of quiz '+this.selectedQuizId);
     }
  }
  
  closeModal(){
    this.showModal=false;
  }
  
}
