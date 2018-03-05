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
  userId:number;
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
    
    return this.http.put(CommonUtility.baseApiUrl+"Quiz/UpdateQuiz",JSON.stringify(quiz),options )
                    .map(res=>res.json())
                    .catch(error=>CommonUtility.handleError(error));
  }

  removeQuiz(id:number)
  {
    
    let options=CommonUtility.getRequestOptions();
    
    return this.http.delete(CommonUtility.baseApiUrl+"Quiz/RemoveQuiz?Id="+id, options )
                    .map(res=>res.json())
                    .catch(error=>CommonUtility.handleError(error));
  }

  CheckQuizHasAttemptedOrNot(quizId:number):Observable<boolean>
  {
    this.userId=CommonUtility.getAuthUserId();

    return this.http.get(CommonUtility.baseApiUrl+"Quiz/CheckQuizHasAttempted/"+quizId+"/"+this.userId)
    .map(res=>res.json())
    .catch(err=>CommonUtility.handleError(err));
  }
  submitTest(quiz: QuizMaster) {
    this.userId=CommonUtility.getAuthUserId();

    let options=CommonUtility.getRequestOptions();
    
   return this.http.post(CommonUtility.baseApiUrl+"Quiz/SubmitQuiz/"+this.userId,JSON.stringify(quiz),options)
         .map(res=>res.json())
         .catch(err=>CommonUtility.handleError(err));
  }

 getQuizResult(quizId:Number):Observable<QuizMaster>
 {
  this.userId=CommonUtility.getAuthUserId();
  
   return this.http.get(CommonUtility.baseApiUrl+"Quiz/QuizResult/"+quizId+"/"+this.userId)
   .map(res=>res.json())
   .catch(err=>CommonUtility.handleError(err));   
 }
  
    
  handleError(error: Response) {
    return Observable.throw(error);
  }

 
}
