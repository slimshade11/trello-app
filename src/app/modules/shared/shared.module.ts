import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

//Primeng modules
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    InputTextModule,
    PasswordModule,
    ButtonModule,
    ProgressSpinnerModule,
  ],
  exports: [
    InputTextModule,
    PasswordModule,
    ButtonModule,
    ProgressSpinnerModule,
  ],
})
export class SharedModule {}
