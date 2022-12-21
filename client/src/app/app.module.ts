import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AnalyticsPageComponent } from './components/analytics-page/analytics-page.component';
import { CategoriesPageComponent } from './components/categories-page/categories-page.component';
import { CategoryFormPageComponent } from './components/categories-page/category-form-page/category-form-page.component';
import { PositionDialogComponent } from './components/categories-page/position-dialog/position-dialog.component';
import { PositionFormComponent } from './components/categories-page/position-form/position-form.component';
import { ConfirmationDialogComponent } from './components/confirmation-dialog/confirmation-dialog.component';
import { HistoryPageComponent } from './components/history-page/history-page.component';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { OrderPageComponent } from './components/order-page/order-page.component';
import { OverviewPageComponent } from './components/overview-page/overview-page.component';
import { SignupPageComponent } from './components/signup-page/signup-page.component';
import { AuthLayoutComponent } from './shared/layouts/auth-layout/auth-layout.component';
import { MainLayoutComponent } from './shared/layouts/main-layout/main-layout.component';
import { AuthInterceptorService } from './shared/services/auth-interceptor.service';

@NgModule({
  declarations: [
    AnalyticsPageComponent,
    AppComponent,
    AuthLayoutComponent,
    CategoriesPageComponent,
    CategoryFormPageComponent,
    ConfirmationDialogComponent,
    HistoryPageComponent,
    LoginPageComponent,
    MainLayoutComponent,
    OrderPageComponent,
    OverviewPageComponent,
    PositionDialogComponent,
    PositionFormComponent,
    SignupPageComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatButtonModule,
    MatCardModule,
    MatDialogModule,
    MatIconModule,
    MatInputModule,
    MatMenuModule,
    MatProgressSpinnerModule,
    MatFormFieldModule,
    MatSidenavModule,
    MatSnackBarModule,
    MatToolbarModule,
    MatTooltipModule,
    ReactiveFormsModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      multi: true,
      useClass: AuthInterceptorService
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
