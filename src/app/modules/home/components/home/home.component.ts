import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthFacade } from '@auth/auth.facade';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
    isAuthLoading$: Observable<boolean> = this.authFacade.getIsAuthLoading$();

    constructor(private authFacade: AuthFacade, private router: Router) {}

    ngOnInit(): void {
        this.authFacade.getIsLoggedIn$().subscribe({
            next: (isLoggedIn: boolean) => {
                if (isLoggedIn) {
                    this.router.navigateByUrl('/boards');
                }
            },
        });
    }
}
