import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

//Primeng modules
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { ToastModule } from 'primeng/toast';
import { MenubarModule } from 'primeng/menubar';
import { MenubarComponent } from './components/menubar/menubar.component';
import { InlineFormComponent } from './components/inline-form/inline-form.component';

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
  ],
  exports: [
    InputTextModule,
    PasswordModule,
    ButtonModule,
    ProgressSpinnerModule,
    ToastModule,
    MenubarModule,
    MenubarComponent,
  ],
})
export class SharedModule {}
