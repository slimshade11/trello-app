import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

//Primeng modules
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { ToastModule } from 'primeng/toast';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    InputTextModule,
    PasswordModule,
    ButtonModule,
    ProgressSpinnerModule,
    ToastModule,
  ],
  exports: [
    InputTextModule,
    PasswordModule,
    ButtonModule,
    ProgressSpinnerModule,
    ToastModule,
  ],
})
export class SharedModule {}
