import { Observable } from "rxjs/Observable";

import { Http, RequestOptions, RequestMethod, Headers } from '@angular/http';


export class CommonUtility {
  // static baseApiUrl:string='http://localhost:3000/';
  static baseApiUrl: string = 'http://localhost:54658/api/';

  static handleError(error: Response) {
    return Observable.throw(error);
  }

  static serializeObj(obj) {
    let serializeBody: string = '&';
    var result = [];
    for (var property in obj) {      
        result.push(encodeURIComponent(property) + "=" + encodeURIComponent(obj[property]));      
    }

    serializeBody += result.join("&");

    return serializeBody;
  }

  static getRequestOptions(methodType:RequestMethod)
  {
    return new RequestOptions({ method: methodType, headers: new Headers({ 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' }) });
  }
  
}
