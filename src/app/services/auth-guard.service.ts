import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot } from '@angular/router';
import { AuthService } from './auth.service';
@Injectable()
export class AuthGuardService implements CanActivate {

  constructor(private _router: Router,
    private _authservice: AuthService) { }

  canActivate(): boolean {
     if (!this._authservice.isAuthenticated()) {

      this._router.navigate(['login']);
      return false;
    }

    return true;
  }

}
