import { Injectable } from '@angular/core';
import {Http, RequestOptions, RequestMethod,Headers} from '@angular/http'
import { Iquestion } from '../models/iquestion';
import { Observable } from 'rxjs/Observable';
import { CommonUtility } from '../shared/common-utility';
import { ApiResponse } from '../models/api-response';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Question } from '../models/question';

@Injectable()
export class QuestionService {

  constructor(private http:Http) { }

  getQuestionById(id: number): Observable<Question> {
    return this.http.get(CommonUtility.baseApiUrl+'Question/GetQuestion/'+id)
    .map(res => res.json())
    .catch(CommonUtility.handleError);
  }

  public CreateQuestion(question:Iquestion)
  {    
    let options = CommonUtility.getRequestOptions();
         
    return this.http.post(CommonUtility.baseApiUrl+"Question/CreateQuestion", JSON.stringify(question), options )
    .map(res=>res)
    .catch(CommonUtility.handleError);
  }
  public UpdateQuestion(question:Iquestion)
  {    
    let options = CommonUtility.getRequestOptions();
         
    return this.http.put(CommonUtility.baseApiUrl+"Question/UpdateQuestion", JSON.stringify(question), options )
    .map(res=>res)
    .catch(CommonUtility.handleError);
  }

  removeQuestion(id:number):Observable<boolean> 
  {    
    let options = CommonUtility.getRequestOptions();
    
    return this.http.delete(CommonUtility.baseApiUrl+'Question/RemoveQuestion?questionId='+id,options)
     .map(res=>res)
     .catch(CommonUtility.handleError)
  }

  activateQuestion(id:number):Observable<boolean> 
  {    
    let options = CommonUtility.getRequestOptions();
    
    return this.http.put(CommonUtility.baseApiUrl+'Question/ActivateQuestion?questionId='+id,options)
     .map(res=>res)
     .catch(CommonUtility.handleError)
  }


}
