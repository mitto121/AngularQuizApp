import { Observable } from "rxjs/Observable";

import { Http, RequestOptions, RequestMethod, Headers } from '@angular/http';
import { FormGroup, FormControl } from "@angular/forms";
import { userInfo } from "os";
import { PagingModel } from "../models/paging-model";
import * as _ from 'underscore';

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

  static getPaging<T>(totalRecords:number,currentPage:number,pageSize:number=10):PagingModel<T>
  {  
    let pagingModel=new PagingModel<T>();
    if (currentPage < 1 || currentPage > totalRecords-1) {
      return;
    }    
    pagingModel.currentPage=currentPage;
    pagingModel.totalRecords=totalRecords; 
    pagingModel.startIndex = (currentPage - 1) * pageSize;
    pagingModel.endIndex = Math.min(pagingModel.startIndex + pageSize - 1, totalRecords - 1);
     
     let totalPages = Math.ceil(totalRecords / pageSize);
     let midPage=(totalPages/2);
     let startPage: number, endPage: number;
    if (totalPages <= pageSize) {        
        startPage = 1;
        endPage = totalPages;
    } else {       
        if (currentPage <= (midPage+1)) {
            startPage = 1;
            endPage = pageSize;
        } else if (currentPage + (midPage-1) >= totalPages) {
            startPage = totalPages - pageSize-1;
            endPage = totalPages;
        } else {
            startPage = currentPage - midPage;
            endPage = currentPage + (midPage-1);
        }
    }
  
    pagingModel.pages = _.range(startPage, endPage+1 );

    return pagingModel;
  }

  static formatDate(date) {
    var d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
  }

}
