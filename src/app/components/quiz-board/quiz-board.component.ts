import { Component, OnInit } from '@angular/core';
import { QuizService } from '../../services/quiz.service';
import { QuizMaster } from '../../models/quiz-master';
import { QuizParticipant } from '../../models/quiz-participant';
import { CommonUtility } from '../../shared/common-utility';

@Component({
  selector: 'app-quiz-board',
  templateUrl: './quiz-board.component.html',
  styleUrls: ['./quiz-board.component.css']
})
export class QuizBoardComponent implements OnInit {
  quizes: QuizMaster[];
  participants: QuizParticipant[];
  participantsItems: QuizParticipant[];
  filterValue: string;
  selectedQuizId: number;
  searchBy: string = "name";
  searchValue: any;
  constructor(private _quiz: QuizService) {
    this.participantsItems = [];
  }

  ngOnInit() {
    this._quiz.getQuizes()
      .subscribe(
        (res) => {
          if (res && res.result.length) {
            this.quizes = res.result;
            this.selectedQuizId = res.result[0].id;
            this.loadParticipants();
          }
        },
        (error) => console.log(error)

      );
  }

  onSelectedRow(id: number) {
    this.selectedQuizId = id;
    this.loadParticipants();
  }
  onSearchTextChange(textVal: string) {
    this.filterValue = textVal;
    if (this.filterValue.trim().length) {
      this.selectedQuizId = 0;
      this.loadParticipants();
    }
  }
  loadParticipants() {
    this._quiz.getQuizParticipants(this.selectedQuizId)
      .subscribe(
        (res) => {
          if (res) {
            this.participants = res;
            Object.assign(this.participantsItems, this.participants);
          }
        },
        (error) => console.error(error)
      );
  }
  onfilterChange(selectedVal: string) {
    this.searchBy = selectedVal;
    this.searchValue = '';
  }
  onSearch(): {} {
    debugger;
    Object.assign(this.participantsItems, this.participants);
    this.searchValue = (this.searchValue) ? this.searchValue.trim().toLowerCase() : null;
    if (this.searchBy == 'name') {
      this.participantsItems = this.searchValue ? this.participantsItems.filter(
        (participant: QuizParticipant) => participant.name.toLowerCase().indexOf(this.searchValue) !== -1
      ) : this.participantsItems;
    }
    else if (this.searchBy == 'date') {
      this.participantsItems = this.searchValue ? this.participantsItems.filter(
        (participant: QuizParticipant) => this.searchValue == CommonUtility.formatDate(participant.date)
      ) : this.participantsItems;
    }
    return this.participantsItems;
  }
 
}
