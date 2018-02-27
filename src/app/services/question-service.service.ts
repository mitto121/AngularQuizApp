import { Injectable } from '@angular/core';
import {Http, RequestOptions, RequestMethod,Headers} from '@angular/http'
import { Iquestion } from '../models/iquestion';
import { Observable } from 'rxjs/Observable';
import { CommonUtility } from '../shared/common-utility';
import { ApiResponse } from '../models/api-response';
import { HttpHeaders, HttpClient } from '@angular/common/http';

@Injectable()
export class QuestionService {

  constructor(private http:HttpClient) { }

  public CreateQuestion(question:Iquestion)
  {
  debugger;
    let requestOptions=CommonUtility.getRequestOptions(RequestMethod.Post);
    let body = CommonUtility.serializeObj(question);
    body+= CommonUtility.serializeObj(question.options);

    let  httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'my-auth-token'
      })
    };

    console.log(body);
    let options = new RequestOptions({   headers: new Headers({ 'Content-Type': 'application/json; charset=utf-8' }) });

    return this.http.post(CommonUtility.baseApiUrl+"Question/CreateQuestion", (question),httpOptions)
    .map(res=>res)
    .catch(CommonUtility.handleError);
  }

}
