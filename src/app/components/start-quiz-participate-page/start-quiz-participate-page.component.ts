import { Component, OnInit } from '@angular/core';
import { QuizMaster } from '../../models/quiz-master';
import { ActivatedRoute } from '@angular/router';
import { QuizService } from '../../services/quiz.service';
import { Participant } from '../../models/participant';

@Component({
  selector: 'start-quiz-participate-page',
  templateUrl: './start-quiz-participate-page.component.html',
  styleUrls: ['./start-quiz-participate-page.component.css']
})
export class StartQuizParticipatePageComponent implements OnInit {

  quizId: number;
  participantId:number;
  constructor(private _activatedRoute: ActivatedRoute,
    private _quizService: QuizService) { }

  ngOnInit() {
    let decryptId = this._activatedRoute.snapshot.params['id'];
    this.quizId=Number(atob(decryptId));
  }

  onContinue(id)
  {    
   this.participantId=id;  
  }
}
