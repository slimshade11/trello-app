import { Observable, takeUntil } from 'rxjs';
import { RegisterForm } from '@auth/interfaces/register-form.interface';
import { Component, OnInit, Self } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { RegisterFormService } from '@auth/services/register-form.service';
import { AuthFacade } from '@auth/auth.facade';
import { RegisterRequest } from '@auth/interfaces/register-request.interface';
import { HttpErrorResponse } from '@angular/common/http';
import { DestroyComponent } from '@standalone/components/destroy/destroy.component';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  providers: [RegisterFormService],
})
export class RegisterComponent extends DestroyComponent implements OnInit {
  isAuthLoading$: Observable<boolean> = this.authFacade.getIsAuthLoading$();

  form: FormGroup<RegisterForm> | null = null;
  errors: string[] = [];

  constructor(
    @Self() private registerFormService: RegisterFormService,
    private authFacade: AuthFacade
  ) {
    super();
  }

  ngOnInit(): void {
    this.getForm();
  }

  getForm(): void {
    this.registerFormService.buildForm();
    this.registerFormService
      .getRegisterForm$()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (form: FormGroup<RegisterForm> | null) => (this.form = form),
      });
  }

  onSubmit(): void {
    if (!this.form?.value) {
      // toast here
      return;
    }

    const registerPayload: RegisterRequest = {
      email: this.form.value.email!,
      password: this.form.value.password!,
      username: this.form.value.username!,
    };

    this.authFacade.register$(registerPayload).subscribe({
      error: (err: HttpErrorResponse): void => {
        this.errors = err.error.emailOrPassword;
        console.log(this.errors);
      },
    });
    this.form.reset();
  }
}
