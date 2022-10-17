import { AuthFacade } from '@auth/auth.facade';
import { LoginForm } from '@auth/interfaces/login-form.interface';
import { Component, OnInit, Self } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { LoginFormService } from '@auth/services/login-form.service';
import { Observable, takeUntil } from 'rxjs';
import { DestroyComponent } from '@standalone/components/destroy/destroy.component';
import { LoginRequest } from '@auth/interfaces/login-request.interface';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [LoginFormService],
})
export class LoginComponent extends DestroyComponent implements OnInit {
  isAuthLoading$: Observable<boolean> = this.authFacade.getIsAuthLoading$();

  form: FormGroup<LoginForm> | null = null;
  error!: string;

  constructor(
    @Self() private loginFormService: LoginFormService,
    private authFacade: AuthFacade
  ) {
    super();
  }

  ngOnInit(): void {
    this.getLoginForm();
  }

  getLoginForm(): void {
    this.loginFormService.buildForm();
    this.loginFormService
      .getLoginForm$()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (form: FormGroup<LoginForm> | null) => (this.form = form),
      });
  }

  onSubmit(): void {
    if (!this.form?.value) {
      //toast here
      return;
    }

    const loginPayload: LoginRequest = {
      email: this.form.value.email!,
      password: this.form.value.password!,
    };

    this.authFacade.login$(loginPayload).subscribe({
      error: (err: HttpErrorResponse) => {
        this.error = err.error.emailOrPassword;
      },
    });

    this.form.reset();
  }
}
