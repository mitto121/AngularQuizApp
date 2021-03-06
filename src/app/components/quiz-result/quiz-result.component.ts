import { Component, OnInit } from '@angular/core';
import { QuizService } from '../../services/quiz.service';
import { QuizMaster } from '../../models/quiz-master';
import { QuizParticipant } from '../../models/quiz-participant';
import { CommonUtility } from '../../shared/common-utility';
import { ParticipantService } from '../../services/participant.service';

@Component({
  selector: 'app-quiz-board',
  templateUrl: './quiz-Result.component.html',
  styleUrls: ['./quiz-Result.component.css']
})
export class QuizResultComponent implements OnInit {
  quizes: QuizMaster[];
  participants: QuizParticipant[];
  participantsItems: QuizParticipant[];
  totalParticipant = 0;
  filterValue: string;
  selectedQuizId: number;
  searchBy = 'name';
  searchValue: any;
  showPaging: boolean;
  sortingColumn:string;
  isDesc:boolean;
  constructor(private _quiz: QuizService,
              private _participantService: ParticipantService) {
    this.participantsItems = [];
  }

  ngOnInit() {
    this._quiz.getQuizes()
      .subscribe(
      (res) => {
        if (res && res.result.length) {
          this.quizes = res.result.filter(x => x.isActive);
          this.selectedQuizId = res.result[0].id;
        }
        this.loadParticipants();
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
    this._participantService.getQuizParticipants(this.selectedQuizId)
      .subscribe(
      (res) => {
        if (res) {
          this.participants = res;
          this.totalParticipant = res.length;
          this.participantsItems = [];
          Object.assign(this.participantsItems, this.participants);
        }
      },
      (error) => console.error(error),
      () => this.showPaging = this.participants.length > 5
      );
  }
  onfilterChange(selectedVal: string) {
    this.searchBy = selectedVal;
    this.searchValue = '';
  }
  onSearch(): QuizParticipant[] {
    Object.assign(this.participantsItems, this.participants);
    this.searchValue = (this.searchValue) ? this.searchValue.trim().toLowerCase() : null;
    if (this.searchBy == 'name') {
      this.participantsItems = this.searchValue ? this.participantsItems.filter(
        (participant: QuizParticipant) => participant.name.toLowerCase().indexOf(this.searchValue) !== -1
      ) : this.participantsItems;
    } else if (this.searchBy == 'date') {
      this.participantsItems = this.searchValue ? this.participantsItems.filter(
        (participant: QuizParticipant) => this.searchValue == CommonUtility.formatDate(participant.date)
      ) : this.participantsItems;
    }
    return this.participantsItems;
  }
  sort(columnName: string) {
    this.sortingColumn = columnName;
    this.isDesc = !this.isDesc;   
    let direction=this.isDesc?1:-1;
    CommonUtility.Sorting(this.participantsItems,columnName,direction);
  }
}
