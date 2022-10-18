import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject, Observable } from 'rxjs';
import { LoginForm } from '@auth/interfaces/login-form.interface';

@Injectable({
  providedIn: 'root',
})
export class LoginFormService {
  form$: BehaviorSubject<FormGroup<LoginForm> | null> =
    new BehaviorSubject<FormGroup<LoginForm> | null>(null);

  constructor(private formBuilder: FormBuilder) {}

  buildForm(): void {
    const loginForm: FormGroup<LoginForm> = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });

    this.setLoginForm(loginForm);
  }

  setLoginForm(loginForm: FormGroup<LoginForm>): void {
    this.form$.next(loginForm);
  }

  getLoginForm$(): Observable<FormGroup<LoginForm> | null> {
    return this.form$.asObservable();
  }
}
