import { Component, OnInit } from '@angular/core';
import { QuizService } from '../../services/quiz.service';
import { QuizMaster } from '../../models/quiz-master';
import { QuizParticipant } from '../../models/quiz-participant';

@Component({
  selector: 'app-quiz-board',
  templateUrl: './quiz-board.component.html',
  styleUrls: ['./quiz-board.component.css']
})
export class QuizBoardComponent implements OnInit {
  quizes: QuizMaster[];
  participants: QuizParticipant[];
  filterValue: string;
  selectedQuizId: number;
  searchBy:string="name";
  searchValue:string;
  constructor(private _quiz: QuizService) { }

  ngOnInit() {
    this._quiz.getQuizes()
      .subscribe(
        (res) => {
          if (res && res.result.length) {
            this.quizes = res.result;  
            this.selectedQuizId=res.result[0].id;          
          }
        },
        (error) => console.log(error),
        ()=>this.loadParticipants()
      );
  }

  onSelectedRow(id: number) {   
    this.selectedQuizId = id;
    this.loadParticipants();
  }
  onSearchTextChange(textVal:string)
  {   
    this.filterValue=textVal;
    if(this.filterValue.trim().length)
    {
      this.selectedQuizId = 0;
      this.loadParticipants();
    }
  }
  loadParticipants()
  {
    this._quiz.getQuizParticipants(this.selectedQuizId)
    .subscribe(
      (res) => {
        if (res) {
          this.participants = res;            
        }
      },
      (error) => console.error(error)     
    );
  }
  onfilterChange(selectedVal:string)
  {
     this.searchBy=selectedVal;
  } 
  onSearch():{}
  {
     return  {
        filterBy:this.searchBy,
        filterText:this.searchValue
     };
  }
}
