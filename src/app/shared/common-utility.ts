import { Observable } from "rxjs/Observable";

import { Http, RequestOptions, RequestMethod, Headers } from '@angular/http';
import { FormGroup, FormControl } from "@angular/forms";
import { userInfo } from "os";


export class CommonUtility {
  // static baseApiUrl:string='http://localhost:3000/';
  static baseApiUrl: string = 'http://localhost:54658/api/';

  static handleError(error: Response) {
    return Observable.throw(error);
  }

  static getRequestOptions() {
    return new RequestOptions({ headers: new Headers({ 'Content-Type': 'application/json; charset=utf-8' }) });
  }

  static validateAllFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        control.markAsTouched({ onlySelf: true });
      } else if (control instanceof FormGroup) {
        this.validateAllFormFields(control);
      }
    });
  }


  static getAuthUserId() {
    var userId: number;
    let user = localStorage.getItem("user");
    if (user) {
      userId = JSON.parse(user).id;
    }
    return userId;
  }

}
