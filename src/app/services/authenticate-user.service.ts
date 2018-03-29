import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { UserAccount } from '../models/user-account';
import { promise } from 'protractor';
import { CommonUtility } from '../shared/common-utility';
import { ApiResponse } from '../models/api-response';
import { Jsonp } from '@angular/http';
@Injectable()
export class AuthenticateUserService {


    constructor(private _http: HttpClient) { }


    login(username: string, password: string) {
        return this._http.get<ApiResponse<UserAccount>>(CommonUtility.baseApiUrl + `UserAccount/AuthenticateUser/${username}/${password}`,{responseType:'json'});
      
    }


}
