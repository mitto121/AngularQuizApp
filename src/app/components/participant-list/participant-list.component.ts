import { Component, OnInit } from '@angular/core';
import { ParticipantService } from '../../services/participant.service';
import { QuizParticipant } from '../../models/quiz-participant';
import { ActivatedRoute } from '@angular/router';
import { ParticipantSearchFilter } from '../../models/participantSearchFilter';
import { CommonUtility } from '../../shared/common-utility';

@Component({
  selector: 'app-participant-list',
  templateUrl: './participant-list.component.html',
  styleUrls: ['./participant-list.component.css']
})
export class ParticipantListComponent implements OnInit {

  quizId: number;
  participants: QuizParticipant[];
  participantsPagedItems: QuizParticipant[];
  showPaging: boolean;
  totalParticipant = 0;
  searchFilter: ParticipantSearchFilter;

  constructor(private _activedRoute: ActivatedRoute,
    private _participantService: ParticipantService) {
    this.participantsPagedItems = [];
    this.searchFilter = new ParticipantSearchFilter();
  }

  ngOnInit() {
    this.quizId = this._activedRoute.snapshot.params["quizId"];
    this.getParticipantsByQuizId();
  }


  onSearch() {
    let name = (this.searchFilter.name) ?
      this.searchFilter.name.trim().toLowerCase() : null;

    let email = (this.searchFilter.email) ?
      this.searchFilter.email.trim().toLowerCase() : null;

    let result = (this.searchFilter.result) ?
      this.searchFilter.result.trim().toLowerCase() : null;

    let dateOfBirth = (this.searchFilter.dateOfBirth) ?
      this.searchFilter.dateOfBirth.trim().toLowerCase() : null;

    let attemptDate = (this.searchFilter.attemptDate) ?
      this.searchFilter.attemptDate.trim().toLowerCase() : null;

    this.searchParticipant({ name, email, dateOfBirth, attemptDate, result })
  }

  private getParticipantsByQuizId() {
    this._participantService.getQuizParticipants(this.quizId)
      .subscribe((res) => {
        if (res) {
          this.participants = res;
          this.totalParticipant = res.length;
          this.participantsPagedItems = [];
          Object.assign(this.participantsPagedItems, this.participants);
          this.showPaging = (this.totalParticipant / 10) > 1;
        }
      }, (error) => console.error(error));
  }

  private searchParticipant(filter: ParticipantSearchFilter) {
    Object.assign(this.participantsPagedItems, this.participants);

    if (filter.name) {
      this.participantsPagedItems = this.participantsPagedItems.filter(
        (participant: QuizParticipant) => participant.name.toLowerCase().indexOf(filter.name) !== -1);
    }
    
    if (filter.email) {
      this.participantsPagedItems = this.participantsPagedItems.filter(
        (participant: QuizParticipant) => participant.email.toLowerCase().indexOf(filter.email) !== -1);
    }

    if (filter.dateOfBirth) {
      this.participantsPagedItems = this.participantsPagedItems.filter(
        (participant: QuizParticipant) => filter.dateOfBirth == CommonUtility.formatDate(participant.dateOfBirthDisplayText)
      );
    }

    if (filter.attemptDate) {
      this.participantsPagedItems = this.participantsPagedItems.filter(
        (participant: QuizParticipant) => filter.attemptDate == CommonUtility.formatDate(participant.date)
      );
    }

    this.participantsPagedItems = filter.result ? this.participantsPagedItems.filter(
      (participant: QuizParticipant) => participant.result.toLowerCase().indexOf(filter.result) !== -1)
      : this.participantsPagedItems;

  }
}
