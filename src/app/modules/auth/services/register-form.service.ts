import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { RegisterForm } from '@auth/interfaces/register-form.interface';

@Injectable()
export class RegisterFormService {
  form$: BehaviorSubject<FormGroup<RegisterForm> | null> =
    new BehaviorSubject<FormGroup<RegisterForm> | null>(null);

  constructor(private formBuilder: FormBuilder) {}

  buildForm(): void {
    const registerForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });

    this.setForm(registerForm);
  }

  setForm(form: FormGroup<RegisterForm>): void {
    this.form$.next(form);
  }

  getRegisterForm$(): Observable<FormGroup<RegisterForm> | null> {
    return this.form$.asObservable();
  }
}
