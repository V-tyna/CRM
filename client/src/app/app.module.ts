import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
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
import { HistoryDialogComponent } from './components/history-page/history-dialog/history-dialog.component';
import { HistoryFilterComponent } from './components/history-page/history-filter/history-filter.component';
import { HistoryPageComponent } from './components/history-page/history-page.component';
import { HistoryTableComponent } from './components/history-page/history-table/history-table.component';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { OrderCategoriesComponent } from './components/order-page/order-categories/order-categories.component';
import { OrderDialogFormComponent } from './components/order-page/order-dialog-form/order-dialog-form.component';
import { OrderPageComponent } from './components/order-page/order-page.component';
import { OrderPositionsComponent } from './components/order-page/order-positions/order-positions.component';
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
    SignupPageComponent,
    OrderCategoriesComponent,
    OrderPositionsComponent,
    OrderDialogFormComponent,
    HistoryTableComponent,
    HistoryFilterComponent,
    HistoryDialogComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    MatButtonModule,
    MatCardModule,
    MatDatepickerModule,
    MatDialogModule,
    MatIconModule,
    MatInputModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatFormFieldModule,
    MatSidenavModule,
    MatSnackBarModule,
    MatTableModule,
    MatToolbarModule,
    MatTooltipModule,
    ReactiveFormsModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      multi: true,
      useClass: AuthInterceptorService
    },
    MatDatepickerModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
