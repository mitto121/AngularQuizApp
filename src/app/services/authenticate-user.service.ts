import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'
@Injectable()
export class AuthenticateUserService {

  constructor(private _http:Http) { }
  login(username: string, password: string) {
    return this._http.get('')
        .map(user => {
             if (user) {
                localStorage.setItem('currentUser', JSON.stringify(user));
            }

            return user;
        });
}

logout() {    
    localStorage.removeItem('currentUser');
}
}
