import { Injectable } from '@angular/core';
import { Http} from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import { QuizMaster } from '../models/quiz-master';
import { error } from 'selenium-webdriver';
import { Response } from '@angular/http/src/static_response';
import { Iquestion } from '../models/iquestion';
import { CommonUtility } from '../shared/common-utility';
import { ApiResponse } from '../models/api-response';


@Injectable()
export class QuizService {
 
  constructor(private http: Http) {   
   }

  getQuizes(): Observable<ApiResponse<QuizMaster[]>> {
    return this.http.get(CommonUtility.baseApiUrl+'Quiz/Quizes')
    .map(res => res.json())
    .catch(this.handleError);
  }

  getQuizById(id: number): Observable<QuizMaster> {
    return this.http.get(CommonUtility.baseApiUrl+'Quiz/Quize/'+id)
    .map(res => res.json())
    .catch(this.handleError);
  }

  createQuiz(quiz:QuizMaster):Observable<ApiResponse<QuizMaster>>
  {
    let options=CommonUtility.getRequestOptions();
    
    return this.http.post(CommonUtility.baseApiUrl+"Quiz/AddQuiz",JSON.stringify(quiz),options )
                    .map(res=>res.json())
                    .catch(error=>CommonUtility.handleError(error));
  }
  updateQuiz(quiz:QuizMaster):Observable<ApiResponse<QuizMaster>>
  {
    let options=CommonUtility.getRequestOptions();
    
    return this.http.post(CommonUtility.baseApiUrl+"Quiz/UpdateQuiz",JSON.stringify(quiz),options )
                    .map(res=>res.json())
                    .catch(error=>CommonUtility.handleError(error));
  }
  removeQuiz(id:number)
  {
    debugger;
    let options=CommonUtility.getRequestOptions();
    
    return this.http.delete(CommonUtility.baseApiUrl+"Quiz/RemoveQuiz?Id="+id, options )
                    .map(res=>res.json())
                    .catch(error=>CommonUtility.handleError(error));
  }

  submitTest(quiz: QuizMaster) {
   return this.http.post(CommonUtility.baseApiUrl+"submitTest",{'quiz':quiz})
         .catch(this.handleError);
  }

 
  
    
  handleError(error: Response) {
    return Observable.throw(error);
  }

 
}
