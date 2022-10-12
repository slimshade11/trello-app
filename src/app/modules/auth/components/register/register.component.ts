import { RegisterForm } from '@auth/interfaces/register-form.interface';
import { Component, OnInit, Self } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { RegisterFormService } from '@auth/services/register-form.service';
import { AuthFacade } from '@auth/auth.facade';
import { RegisterRequest } from '@auth/interfaces/register-request.interface';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  providers: [RegisterFormService],
})
export class RegisterComponent implements OnInit {
  form!: FormGroup<RegisterForm> | null;
  errors: string[] = [];

  constructor(
    @Self() private registerFormService: RegisterFormService,
    private authFacade: AuthFacade
  ) {}

  ngOnInit(): void {
    this.getForm();
  }

  getForm(): void {
    this.registerFormService.buildForm();
    this.registerFormService.getRegisterForm$().subscribe({
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
      error: (err: HttpErrorResponse) => {
        this.errors = err.error;
      },
    });
    this.form.reset();
  }
}
