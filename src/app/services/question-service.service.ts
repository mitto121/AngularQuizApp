import { Injectable } from '@angular/core';
import {Http, RequestOptions} from '@angular/http'
import { Iquestion } from '../models/iquestion';
import { Observable } from 'rxjs/Observable';
import { CommonUtility } from '../shared/common-utility';

@Injectable()
export class QuestionService {

  constructor(private http:Http) { }

  public CreateQuestion(question:Iquestion)
  {
    return this.http.post(CommonUtility.baseApiUrl+"CreateQuestion",{'questions':question});
  }

}
