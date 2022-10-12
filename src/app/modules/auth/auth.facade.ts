import { RegisterRequest } from './interfaces/register-request.interface';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { AuthApi } from '@auth/api/auth.api';
import { Injectable } from '@angular/core';
import { AuthState } from '@auth/state/auth.state';
import { CurrentUser } from '@auth/interfaces/current-user.interface';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthService } from '@auth/services/auth.service';
import { ToastService } from '@services/toast.service';
import { ToastStatus } from '@enums/toast-status.enum';

@Injectable()
export class AuthFacade {
  constructor(
    private authApi: AuthApi,
    private authState: AuthState,
    private authService: AuthService,
    private toastService: ToastService
  ) {}

  loadCurrentUser$(): Observable<CurrentUser> {
    return this.authApi.loadCurrentUser$().pipe(
      tap((currentUser: CurrentUser) => console.log(currentUser)),
      catchError((err: HttpErrorResponse) => {
        this.authState.setCurrentUser(null);
        return throwError(err);
      })
    );
  }

  register$(registerPayload: RegisterRequest): Observable<CurrentUser> {
    return this.authApi.register$(registerPayload).pipe(
      tap((currentUser: CurrentUser) => {
        this.authService.setToken(currentUser);
        this.setCurrentUser(currentUser);
        this.toastService.showInfoMessage(
          ToastStatus.SUCCESS,
          'Success!',
          'You have been successfully registered '
        );
      }),
      catchError((err: HttpErrorResponse) => {
        console.log('err', err);
        return throwError(err);
      })
    );
  }

  getCurrentUser$(): Observable<CurrentUser | null | undefined> {
    return this.authState.getCurrentUser$();
  }

  setCurrentUser(user: CurrentUser): void {
    this.authState.setCurrentUser(user);
  }
}
