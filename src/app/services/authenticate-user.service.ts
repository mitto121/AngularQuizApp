import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { UserAccount } from '../models/user-account';
import { promise } from 'protractor';
import { CommonUtility } from '../shared/common-utility';
@Injectable()
export class AuthenticateUserService {
  
    
    constructor(private _http: Http) { }


    login(username: string, password: string):Promise<UserAccount> {
        return this._http.get(CommonUtility.baseApiUrl+'userAuthentication?userName='+username+'&password='+password)
            .map(user =>user.json())
            .toPromise()            
            .catch(err=>console.error(err));            
    }
  

}
