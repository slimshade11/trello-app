import { AuthFacade } from '@auth/auth.facade';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthApi } from '@auth/api/auth.api';
import { RegisterComponent } from '@auth/components/register/register.component';
import { AuthRoutingModule } from '@auth/auth-routing-module';
import { SharedModule } from '@shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [RegisterComponent],
  imports: [CommonModule, AuthRoutingModule, SharedModule, ReactiveFormsModule],
  providers: [AuthFacade, AuthApi],
})
export class AuthModule {}
