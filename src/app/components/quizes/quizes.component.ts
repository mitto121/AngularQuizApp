import { Component, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
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
  selectedQuizId: number;
  showModal: boolean;
  pageSize: number;
  currentPageNumber: number;

  constructor(private _quiz: QuizService,
              private _router: Router) {
    this.pageSize = 5;
    this.currentPageNumber = 1;
  }

  ngOnInit() {
    this._quiz.getQuizes()
      .subscribe(
        (res) => this.quizes = res.result,
        (error) => console.error(error)
      );
  }

  removeQuiz(id: number) {
    if (confirm('Are you sure to delete ')) {
      this._quiz.removeQuiz(id).subscribe(
        res => {
          if (res) {
            this.quizes.find(x => x.id == id).isActive = false;
          }
        },
        error => console.error(error)
      );
    }
  }
  activateQuiz(id: number) {
    this._quiz.activateQuiz(id)
    .subscribe(
      res => {this.quizes.find(x => x.id == id).isActive = res; },
      error => console.error(error)
    );
  }

  setQuestionPaper() {
     if (!this.selectedQuizId) {
      this.showModal = true;
     } else {
       this._router.navigate(['/questionPaper', this.selectedQuizId]);

     }
  }
  closeModal() {
    this.showModal = false;
  }
  navigateQuizLinkPage(id: number) {
    this._router.navigate(['/startQuiz', encodeURIComponent(String(id))]);
  }
}
