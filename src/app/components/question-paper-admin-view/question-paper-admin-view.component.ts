import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { QuizService } from '../../services/quiz.service';
import { QuizMaster } from '../../models/quiz-master';
import { QuestionService } from '../../services/question.service';
import { resolve } from 'dns';

@Component({
  selector: 'app-question-paper-admin-view',
  templateUrl: './question-paper-admin-view.component.html',
  styleUrls: ['./question-paper-admin-view.component.css']
})
export class QuestionPaperAdminViewComponent implements OnInit {
  quizId: number;
  quiz: QuizMaster;
  showQuestionListModal: boolean;

  constructor(private _activatedRoute: ActivatedRoute,
    private _router: Router,
    private _quizService: QuizService,
    private _questionService: QuestionService) {
    this.quiz = new QuizMaster();
  }

  ngOnInit() {
    this.quizId = this._activatedRoute.snapshot.params['id'];

    this.loadQuizWithQuestions();

  }
  private loadQuizWithQuestions() {
    this._quizService.getQuizById(this.quizId)
    .subscribe(
      (res) => this.quiz = res,
       (error) => console.error(error),
       () => this.displayQuestionWithAnswer()
      );
  }

  displayQuestionWithAnswer() {
    this.quiz.questions.forEach(x => x.options.forEach(x => x.isSelected = x.isAnswer));
  }
  removeQuestion(questionId) {
    if (confirm('Are you sure to remove this question ?')) {
      let isSucceeded: boolean;
      this._questionService.removeQuestion(questionId)
        .subscribe(
          res => this.removeQuestionSuccessMethod(res, questionId),
          error => console.error(error)
        );
    }
  }

  removeQuestionSuccessMethod(isSuccess: boolean, questionId: number) {
    if (isSuccess) {
      this.quiz.questions.find(x => x.id == questionId).isActive = false;
    } else {
      alert('Deletion failed !!');
    }
  }
  closeModal(val) {
    this.showQuestionListModal = val;
  }
  onQuestionsAdd(val) {
    this.loadQuizWithQuestions();
    this.showQuestionListModal = val;
  }

}
