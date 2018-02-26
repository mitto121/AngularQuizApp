import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { QuizService } from '../../services/quiz.service';
import { QuizMaster } from '../../models/quiz-master';

@Component({
  selector: 'app-question-paper-admin-view',
  templateUrl: './question-paper-admin-view.component.html',
  styleUrls: ['./question-paper-admin-view.component.css']
})
export class QuestionPaperAdminViewComponent implements OnInit {
  quizId: number;
  quiz: QuizMaster;  

  constructor(private _activatedRoute: ActivatedRoute,
    private _router: Router,
    private _quizService: QuizService) {
    this.quiz = new QuizMaster();
  }

  ngOnInit() {
    this.quizId = this._activatedRoute.snapshot.params['id'];

    this._quizService.getQuizById(this.quizId).subscribe(
      (res) => this.quiz = res[0],
      (error) => console.error(error)
    );

  }

  removeQuestion(questionId) {
    if (confirm("are you sure to remove this question ?")) {
      
       this._quizService.removeQuestion(questionId)
       .subscribe(
         res => res,
         error=> console.error(error)        
      );
     
    }
  }


  
}
