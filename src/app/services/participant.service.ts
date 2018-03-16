import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { ApiResponse } from '../models/api-response';
import { Participant } from '../models/participant';
import { CommonUtility } from '../shared/common-utility';
import { QuizParticipant } from '../models/quiz-participant';

@Injectable()
export class ParticipantService {

  constructor(private http: Http) { }

  public getQuizParticipants(quizId: Number): Observable<QuizParticipant[]> {
    return this.http.get(CommonUtility.baseApiUrl + `Participant/QuizParticipants/${quizId}`)
      .map(res => res.json())
      .catch(err => CommonUtility.handleError(err));
  }

  public createParticipant(participant): Observable<ApiResponse<Participant>> {
    const options = CommonUtility.getRequestOptions();
    return this.http.post(CommonUtility.baseApiUrl + 'Participant/CreateParticipant', JSON.stringify(participant), options)
      .map(res => res.json())
      .catch(CommonUtility.handleError);
  }


}
