import { catchError, finalize, Observable, of, tap, throwError } from 'rxjs';
import { AuthApi } from '@auth/api/auth.api';
import { Injectable } from '@angular/core';
import { AuthState } from '@auth/state/auth.state';
import { CurrentUser } from '@auth/interfaces/current-user.interface';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable()
export class AuthFacade {
  constructor(private authApi: AuthApi, private authState: AuthState) {}

  loadCurrentUser$(): Observable<CurrentUser> {
    this.authState.setIsCurrentUserLoading(true);

    return this.authApi.loadCurrentUser$().pipe(
      tap((currentUser: CurrentUser) => console.log(currentUser)),
      catchError((err: HttpErrorResponse) => {
        this.authState.setCurrentUser(null);
        return throwError(err);
      }),
      finalize(() => this.authState.setIsCurrentUserLoading(false))
    );
  }

  getCurrentUser$(): Observable<CurrentUser | null | undefined> {
    return this.authState.getCurrentUser$();
  }
}
