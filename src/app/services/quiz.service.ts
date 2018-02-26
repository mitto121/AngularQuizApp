import { Injectable } from '@angular/core';
import { Http} from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import { QuizMaster } from '../models/quiz-master';
import { error } from 'selenium-webdriver';
import { Response } from '@angular/http/src/static_response';
import { Iquestion } from '../models/iquestion';
import { CommonUtility } from '../shared/common-utility';


@Injectable()
export class QuizService {
 
  constructor(private http: Http) {   
   }

  getQuizes(): Observable<QuizMaster[]> {
    return this.http.get(CommonUtility.baseApiUrl+'quizes')
    .map(res => res.json())
    .catch(this.handleError);
  }

  getQuizById(id: number): Observable<QuizMaster> {
    return this.http.get(CommonUtility.baseApiUrl+'quizes?id=' + id)
    .map(res => res.json())
    .catch(this.handleError);
  }

  submitTest(quiz: QuizMaster) {
   return this.http.post(CommonUtility.baseApiUrl+"submitTest",{'quiz':quiz})
         .catch(this.handleError);
  }

  removeQuestion(id:number):Observable<boolean> 
  {    
    return this.http.delete(CommonUtility.baseApiUrl+'removeQuestion?id='+id)
     .map(res=>res.ok)
     .catch(this.handleError)
  }
    
  

  handleError(error: Response) {
    return Observable.throw(error);
  }
}
