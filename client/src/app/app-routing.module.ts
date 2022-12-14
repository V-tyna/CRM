import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { appPaths } from './configs/app-paths';
import { AuthLayoutComponent } from './shared/layouts/auth-layout/auth-layout.component';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { MainLayoutComponent } from './shared/layouts/main-layout/main-layout.component';
import { SignupPageComponent } from './components/signup-page/signup-page.component';
import { AuthGuardService } from './shared/services/auth-guard.service';

const routes: Routes = [
  {
    path: appPaths['empty'], component: AuthLayoutComponent, children: [
      { path: appPaths['empty'], redirectTo: '/login', pathMatch: 'full' },
      { path: appPaths['login'], component: LoginPageComponent },
      { path: appPaths['signup'], component: SignupPageComponent },
    ]
  },
  {
    path: appPaths['empty'], component: MainLayoutComponent, canActivate: [AuthGuardService], children: [

    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})

export class AppRoutingModule {

}
