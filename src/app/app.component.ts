import { CurrentUser } from './modules/auth/interfaces/current-user.interface';
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { AuthFacade } from '@auth/auth.facade';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  currentUser$: Observable<CurrentUser | null | undefined> =
    this.authFacade.getCurrentUser$();

  constructor(private authFacade: AuthFacade) {}

  ngOnInit(): void {
    this.authFacade.loadCurrentUser$().subscribe();

    this.currentUser$.subscribe((r) => console.log(r));
  }
}
