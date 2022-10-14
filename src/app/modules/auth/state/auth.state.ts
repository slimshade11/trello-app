import { CurrentUser } from '@auth/interfaces/current-user.interface';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthState {
  private currentUser$: BehaviorSubject<CurrentUser | null | undefined> =
    new BehaviorSubject<CurrentUser | null | undefined>(undefined);

  private isAuthLoading$: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(false);

  setCurrentUser(user: CurrentUser | null): void {
    this.currentUser$.next(user);
  }

  getCurrentUser$(): Observable<CurrentUser | null | undefined> {
    return this.currentUser$.asObservable();
  }

  setIsAuthLoading(isLoading: boolean): void {
    this.isAuthLoading$.next(isLoading);
  }

  getIsAuthLoading(): Observable<boolean> {
    return this.isAuthLoading$.asObservable();
  }
}
