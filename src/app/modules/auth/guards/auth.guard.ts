import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { map, Observable } from 'rxjs';
import { AuthFacade } from '@auth/auth.facade';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authFacade: AuthFacade, private router: Router) {}
  canActivate():
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.authFacade.getIsLoggedIn$().pipe(
      map((isLoggedin: boolean) => {
        if (isLoggedin) {
          return true;
        }

        this.router.navigateByUrl('/');
        return false;
      })
    );
  }
}
