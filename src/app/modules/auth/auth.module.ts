import { AuthFacade } from '@auth/auth.facade';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthApi } from '@auth/api/auth.api';
import { RegisterComponent } from '@auth/components/register/register.component';
import { AuthRoutingModule } from '@auth/auth-routing-module';
import { SharedModule } from '@shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '@auth/services/auth.service';
import { LoginComponent } from '@auth/components/login/login.component';
import { AuthGuard } from '@auth/guards/auth.guard';

@NgModule({
  declarations: [RegisterComponent, LoginComponent],
  imports: [CommonModule, AuthRoutingModule, SharedModule, ReactiveFormsModule],
  providers: [AuthFacade, AuthApi, AuthService, AuthGuard],
})
export class AuthModule {}
