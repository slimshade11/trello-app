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
import { SocketService } from '@services/socket.service';

@Injectable()
export class AuthFacade {
  constructor(
    private authApi: AuthApi,
    private authState: AuthState,
    private authService: AuthService,
    private toastService: ToastService,
    private router: Router,
    private socketService: SocketService
  ) {}

  loadCurrentUser$(): Observable<CurrentUser> {
    this.authState.setIsAuthLoading(true);
    return this.authApi.loadCurrentUser$().pipe(
      tap((currentUser: CurrentUser): void => {
        this.socketService.setupSocketConnection(currentUser);
        this.authState.setCurrentUser(currentUser);
      }),
      catchError((err: HttpErrorResponse): Observable<never> => {
        this.authState.setCurrentUser(null);
        return throwError(err);
      }),
      finalize((): void => this.authState.setIsAuthLoading(false))
    );
  }

  register$(registerPayload: RegisterRequest): Observable<CurrentUser> {
    this.authState.setIsAuthLoading(true);
    return this.authApi.register$(registerPayload).pipe(
      tap((currentUser: CurrentUser): void => {
        this.authService.setToken(currentUser);
        this.authState.setCurrentUser(currentUser);
      }),
      tap((): void => {
        this.router.navigateByUrl('/');
      }),
      tap((): void => {
        this.toastService.showInfoMessage(
          ToastStatus.SUCCESS,
          'Success!',
          'You have been successfully registered '
        );
      }),
      catchError((err: HttpErrorResponse): Observable<never> => {
        this.toastService.showInfoMessage(
          ToastStatus.ERROR,
          'Error!',
          'Something went wrong'
        );
        return throwError(err);
      }),
      finalize((): void => this.authState.setIsAuthLoading(false))
    );
  }

  login$(loginPayload: LoginRequest): Observable<CurrentUser> {
    this.authState.setIsAuthLoading(true);
    return this.authApi.login$(loginPayload).pipe(
      tap((currentUser: CurrentUser) => {
        this.authService.setToken(currentUser);
        this.authState.setCurrentUser(currentUser);
      }),
      tap((): void => {
        this.router.navigateByUrl('/');
      }),
      tap((): void => {
        this.toastService.showInfoMessage(
          ToastStatus.SUCCESS,
          'Success!',
          'You have been successfully logged in'
        );
      }),
      catchError((err: HttpErrorResponse): Observable<never> => {
        return throwError(err);
      }),
      finalize((): void => this.authState.setIsAuthLoading(false))
    );
  }

  logout(): void {
    this.authService.logout();
    this.authState.setCurrentUser(null);
    this.socketService.disconnect();
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
