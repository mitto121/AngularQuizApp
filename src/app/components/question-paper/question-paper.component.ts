import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router'
import { QuizService } from '../../services/quiz.service';
import { Question } from '../../models/question';
import { Iquestion } from '../../models/iquestion';
import { QuizMaster } from '../../models/quiz-master';
import { Observable } from 'rxjs/Observable';
import { Ioption } from '../../models/ioption';


@Component({
  selector: 'app-question-paper',
  templateUrl: './question-paper.component.html',
  styleUrls: ['./question-paper.component.css']
})
export class QuestionPaperComponent implements OnInit {
  quizId: number;
  quiz:QuizMaster;
  questions:Iquestion[];
  showResult:boolean;
  showModal:boolean;
  noOfQuestions:number;
  PageIndex:number=0;

  

  constructor(private _activatedRoute: ActivatedRoute,
    private _router:Router,
    private _quizService: QuizService) { 
      this.quiz=new QuizMaster();     
    }

  ngOnInit() {
    this.quizId = this._activatedRoute.snapshot.params['id'];
    this._quizService.getQuizById(this.quizId)
      .subscribe(
      (res)=>{       
        this.quiz=res[0];
        this.questions=this.quiz.questions;
        this.noOfQuestions=this.questions.length;       
      },
      (error) => this.handleError);      
  }
 

  showCurrentPage(currentPageNumber:number):boolean
  {      
    return this.PageIndex==currentPageNumber;
  }
  pageNavigation(navType:string)
  {
    if(navType=='Previous' && this.PageIndex>0)
    {
        this.PageIndex=this.PageIndex-1;
    }
    else if(navType=='Next' && this.PageIndex<(this.noOfQuestions-1)){
      this.PageIndex=this.PageIndex+1;
    }
  }

 
  setCurrentPage(index:number)
  {
     this.PageIndex=index;
  }
  
  applyNavStyle(isAttempt:boolean,currentPageIndex:number):string
  {
     let navClass:string;
     navClass=isAttempt?'answered ': 'not-answered ' ;
     if(this.PageIndex==currentPageIndex)
     {
      navClass+='highlight';
     }
     return navClass;
  }

  submitTest(){
    this.showModal=true;      
    // this._quizService.submitTest(this.quiz)
    // .toPromise().then()
    // .catch(error=>this.handleError);
    console.log(this.quiz);
  }

  handleError(error:any)
  {
    console.log(error);
  }

  showQuizResult()
  {
    this.showModal=false;
    this.showResult=true;    
  }
  closeModal(isShow)
  {     
  }
 
}

