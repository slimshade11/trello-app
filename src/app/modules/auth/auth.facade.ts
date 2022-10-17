import { RegisterRequest } from './interfaces/register-request.interface';
import { catchError, finalize, Observable, tap, throwError } from 'rxjs';
import { AuthApi } from '@auth/api/auth.api';
import { Injectable } from '@angular/core';
import { AuthState } from '@auth/state/auth.state';
import { CurrentUser } from '@auth/interfaces/current-user.interface';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthService } from '@auth/services/auth.service';
import { ToastService } from '@services/toast.service';
import { ToastStatus } from '@enums/toast-status.enum';
import { LoginRequest } from '@auth/interfaces/login-request.interface';
import { Router } from '@angular/router';

@Injectable()
export class AuthFacade {
  constructor(
    private authApi: AuthApi,
    private authState: AuthState,
    private authService: AuthService,
    private toastService: ToastService,
    private router: Router
  ) {}

  loadCurrentUser$(): Observable<CurrentUser> {
    return this.authApi.loadCurrentUser$().pipe(
      tap((currentUser: CurrentUser) => {
        this.authState.setCurrentUser(currentUser);
      }),
      catchError((err: HttpErrorResponse) => {
        this.authState.setCurrentUser(null);
        return throwError(err);
      })
    );
  }

  register$(registerPayload: RegisterRequest): Observable<CurrentUser> {
    this.authState.setIsAuthLoading(true);
    return this.authApi.register$(registerPayload).pipe(
      tap((currentUser: CurrentUser) => {
        this.authService.setToken(currentUser);
        this.authState.setCurrentUser(currentUser);
      }),
      tap(() => this.router.navigateByUrl('/')),
      tap(() => {
        this.toastService.showInfoMessage(
          ToastStatus.SUCCESS,
          'Success!',
          'You have been successfully registered '
        );
      }),
      catchError((err: HttpErrorResponse) => {
        this.toastService.showInfoMessage(
          ToastStatus.ERROR,
          'Error!',
          'Something went wrong'
        );
        return throwError(err);
      }),
      finalize(() => this.authState.setIsAuthLoading(false))
    );
  }

  login$(loginPayload: LoginRequest): Observable<CurrentUser> {
    this.authState.setIsAuthLoading(true);
    return this.authApi.login$(loginPayload).pipe(
      tap((currentUser: CurrentUser) => {
        this.authService.setToken(currentUser);
        this.authState.setCurrentUser(currentUser);
      }),
      tap(() => this.router.navigateByUrl('/')),
      tap(() => {
        this.toastService.showInfoMessage(
          ToastStatus.SUCCESS,
          'Success!',
          'You have been successfully logged in'
        );
      }),
      catchError((err: HttpErrorResponse) => {
        return throwError(err);
      }),
      finalize(() => this.authState.setIsAuthLoading(false))
    );
  }

  logout(): void {
    this.authService.logout();
    this.authState.setCurrentUser(null);
    this.router.navigateByUrl('/');
    this.toastService.showInfoMessage(
      ToastStatus.INFO,
      'You have been successfully logged out',
      ''
    );
  }

  getCurrentUser$(): Observable<CurrentUser | null | undefined> {
    return this.authState.getCurrentUser$();
  }

  getIsAuthLoading$(): Observable<boolean> {
    return this.authState.getIsAuthLoading();
  }

  getIsLoggedIn$(): Observable<boolean> {
    return this.authState.getIsLoggedIn$();
  }
}
