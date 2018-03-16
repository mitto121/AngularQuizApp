import { Observable } from 'rxjs/Observable';

import { Http, RequestOptions, RequestMethod, Headers } from '@angular/http';
import { FormGroup, FormControl } from '@angular/forms';
import { userInfo } from 'os';
import * as _ from 'underscore';

export class CommonUtility {
  // static baseApiUrl:string='http://localhost:3000/';
  static baseApiUrl = 'http://localhost:54658/api/';

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

  static formatDate(date) {
    let d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) { month = '0' + month; }
    if (day.length < 2) { day = '0' + day; }

    return [year, month, day].join('-');
  }

  static removeLocalStorage(...values) {
    for (let item of values) {
      localStorage.removeItem(item);
    }
  }

  static Sorting(value: any[], columnName: string, direction: number)
  {
    return columnName ? value.sort(function (a, b) {
      if (a[columnName] < b[columnName]) {
        return -1 * direction;
      }
      else if (a[columnName] > b[columnName]) {
        return 1 * direction;
      }
      else {
        return 0;
      }
    }) : value;
  }

}
