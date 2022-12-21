import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AnalyticsPageComponent } from './components/analytics-page/analytics-page.component';
import { CategoriesPageComponent } from './components/categories-page/categories-page.component';
import { CategoryFormPageComponent } from './components/categories-page/category-form-page/category-form-page.component';
import { HistoryPageComponent } from './components/history-page/history-page.component';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { OrderCategoriesComponent } from './components/order-page/order-categories/order-categories.component';
import { OrderPageComponent } from './components/order-page/order-page.component';
import { OrderPositionsComponent } from './components/order-page/order-positions/order-positions.component';
import { OverviewPageComponent } from './components/overview-page/overview-page.component';
import { SignupPageComponent } from './components/signup-page/signup-page.component';
import { appPaths } from './configs/app-paths';
import { AuthLayoutComponent } from './shared/layouts/auth-layout/auth-layout.component';
import { MainLayoutComponent } from './shared/layouts/main-layout/main-layout.component';
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
      { path: appPaths['analytics'], component: AnalyticsPageComponent },
      { path: appPaths['categories'], component: CategoriesPageComponent },
      { path: appPaths['categoriesNew'], component: CategoryFormPageComponent },
      { path: appPaths['categoriesId'], component: CategoryFormPageComponent },
      { path: appPaths['history'], component: HistoryPageComponent },
      { path: appPaths['order'], component: OrderPageComponent, children: [
        { path: appPaths['empty'], component: OrderCategoriesComponent },
        { path: appPaths['orderId'], component: OrderPositionsComponent },
      ] },
      { path: appPaths['overview'], component: OverviewPageComponent },
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
