import { AuthModule } from '@auth/auth.module';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeModule } from '@home/home.module';

const routes: Routes = [
  {
    path: '',
    loadChildren: (): Promise<any> =>
      import('@home/home.module').then(
        ({ HomeModule }): HomeModule => HomeModule
      ),
  },
  {
    path: 'login',
    loadChildren: (): Promise<any> =>
      import('@auth/auth.module').then(
        ({ AuthModule }): AuthModule => AuthModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
