import { AuthFacade } from '@auth/auth.facade';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthApi } from '@auth/api/auth.api';

@NgModule({
  declarations: [],
  imports: [CommonModule],
  providers: [AuthFacade, AuthApi],
})
export class AuthModule {}
