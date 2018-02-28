import { Component, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router'
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
  editMode:boolean;

  constructor(private _quiz: QuizService,
              private _router:Router) {

  }

  ngOnInit() {
    this._quiz.getQuizes()
      .subscribe(
        (res) =>this.quizes = res.result,
        (error) => console.error(error)      
      );
  }

  removeQuiz(id: number) {
    if (confirm("Are you sure to delete ")) {
      this._quiz.removeQuiz(id).subscribe(
        res=>{
          if(res)
          {
            this.quizes.find(x=>x.id==id).isActive=false;            
          }
        },
        error=>console.error(error)  
      );
    }
  }

  editQuiz(id: number) {
    this.quizes.find(x=>x.id==id).actionMode='EDIT';   
  }
  cancelUpdateQuiz(id: number) { 
    this.quizes.find(x=>x.id==id).actionMode='VIEW';   
  }
  onUpdateQuiz(quiz:QuizMaster)
  {
    this.quizes.find(x=>x.id==quiz.id).actionMode='VIEW';  
    
  }
  setQuestionPaper()
  {
     if(!this.selectedQuizId)
     {
       this.showModal=true;
     }
     else
     {
       this._router.navigate(['/setQuestionPaper',this.selectedQuizId]);
     }
  }
  
  closeModal(){
    this.showModal=false;
  }
  
}
