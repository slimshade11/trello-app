import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MenubarComponent } from '@shared/components/menubar/menubar.component';
import { InlineFormComponent } from '@shared/components/inline-form/inline-form.component';

//Primeng modules
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { ToastModule } from 'primeng/toast';
import { MenubarModule } from 'primeng/menubar';
import { InputTextareaModule } from 'primeng/inputtextarea';

@NgModule({
  declarations: [MenubarComponent, InlineFormComponent],
  imports: [
    CommonModule,
    InputTextModule,
    PasswordModule,
    ButtonModule,
    ProgressSpinnerModule,
    ToastModule,
    MenubarModule,
    ReactiveFormsModule,
    InputTextareaModule,
  ],
  exports: [
    InputTextModule,
    PasswordModule,
    ButtonModule,
    ProgressSpinnerModule,
    ToastModule,
    MenubarModule,
    MenubarComponent,
    InputTextareaModule,
  ],
})
export class SharedModule {}
