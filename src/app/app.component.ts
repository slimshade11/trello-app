import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AuthService } from './modules/auth/services/auth.service';
import { AuthState } from './modules/auth/state/auth.state';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(private authService: AuthService, private authState: AuthState) {}

  ngOnInit(): void {
    this.authService.getCurrentUser$().subscribe({
      next: () => {},
      error: (err: HttpErrorResponse) => {
        console.log(err.message);
        this.authState.setCurrentUser(null);
      },
    });
  }
}
