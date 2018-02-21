import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import { QuizMaster } from '../models/quiz-master';
import { error } from 'selenium-webdriver';
import { Response } from '@angular/http/src/static_response';
import { Iquestion } from '../models/iquestion';


@Injectable()
export class QuizService {

  constructor(private http: Http) { }

  getQuizes(): Observable<QuizMaster[]> {
    return this.http.get('http://localhost:3000/quizes')
    .map(res => res.json())
    .catch(this.handleError);
  }

  getQuizById(id: number): Observable<QuizMaster> {
    return this.http.get('http://localhost:3000/quizes?id=' + id)
    .map(res => res.json())
    .catch(this.handleError);
  }

  submitTest(quiz: QuizMaster) {
    // return this.http.post("http://localhost:3000/submitTest",{'quiz':quiz})
    // .catch(this.handleError);
    return null;
  }

  handleError(error: Response) {
    return Observable.throw(error);
  }
}
