import { RegisterForm } from '@auth/interfaces/register-form.interface';
import { Component, OnInit, Self } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { RegisterFormService } from '@auth/services/register-form.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  providers: [RegisterFormService],
})
export class RegisterComponent implements OnInit {
  form!: FormGroup<RegisterForm> | null;

  constructor(@Self() private registerFormService: RegisterFormService) {}

  ngOnInit(): void {
    this.getForm();
  }

  getForm(): void {
    this.registerFormService.buildForm();
    this.registerFormService.getRegisterForm$().subscribe({
      next: (form) => (this.form = form),
    });
  }

  onSubmit(): void {
    if (!this.form) return;

    const payload = {
      email: this.form.value.email,
      password: this.form.value.password,
      username: this.form.value.username,
    };

    console.log(this.form.value);
  }
}
