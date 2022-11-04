import { CurrentUser } from '@auth/interfaces/current-user.interface';
import { Injectable } from '@angular/core';
import { BehaviorSubject, filter, map, Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class AuthState {
    private currentUser$: BehaviorSubject<CurrentUser | null | undefined> = new BehaviorSubject<
        CurrentUser | null | undefined
    >(undefined);
    private isAuthLoading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    private isLoggedIn$ = this.currentUser$.pipe(
        filter((currentUser: CurrentUser | null | undefined) => currentUser !== undefined),
        map(Boolean)
    );

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

    getIsLoggedIn$(): Observable<boolean> {
        return this.isLoggedIn$;
    }
}
