import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { UserAccount } from '../models/user-account';
import { promise } from 'protractor';
import { CommonUtility } from '../shared/common-utility';
import { ApiResponse } from '../models/api-response';
@Injectable()
export class AuthenticateUserService {


    constructor(private _http: Http) { }


    login(username: string, password: string): Promise<ApiResponse<UserAccount>> {
        return this._http.get(CommonUtility.baseApiUrl + `UserAccount/AuthenticateUser/${username}/${password}`)
            .map(user => user.json())
            .toPromise()
            .catch(err => console.error(err));
    }


}
