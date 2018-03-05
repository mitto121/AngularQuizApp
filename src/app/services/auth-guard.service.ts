import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot } from '@angular/router';
import { AuthService } from './auth.service';
@Injectable()
export class AuthGuardService implements CanActivate {

  constructor(private _router: Router,
    private _authservice: AuthService) { }

  canActivate(route: ActivatedRouteSnapshot): boolean {

    const expectedRole = route.data.userRole;
    const user = localStorage.getItem("user");
    if (!this._authservice.isAuthenticated()) {

      this._router.navigate(['login']);
      return false;
    }
    else if (!JSON.parse(user).isAdmin && expectedRole == 'ADMIN') {
      this._router.navigate(['login']);
      return false;
    }

    return true;
  }

}
