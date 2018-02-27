import { Injectable } from '@angular/core';
import { UserAccount } from '../models/user-account';
import { Observable } from 'rxjs';
import { CommonUtility } from '../shared/common-utility';
import { Http, RequestOptions, RequestMethod, Headers } from '@angular/http';
import { ApiResponse } from '../models/api-response';

@Injectable()
export class UserAccountService {


  constructor(private http: Http) { }

  public createUser(user): Observable<ApiResponse<boolean>> {
    
    let options=CommonUtility.getRequestOptions(RequestMethod.Post);    
    let body = CommonUtility.serializeObj(user);

    return this.http.post(CommonUtility.baseApiUrl + "UserAccount/CreateUser",body, options)
      .map(res => res.json())
      .catch(CommonUtility.handleError);
  }
  

}
