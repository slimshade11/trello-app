import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { map, Observable } from 'rxjs';
import { AuthFacade } from '@auth/auth.facade';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authFacade: AuthFacade, private router: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
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
