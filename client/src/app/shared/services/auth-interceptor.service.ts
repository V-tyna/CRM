import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, Observable, throwError } from 'rxjs';

import { AuthService } from './auth.service';

@Injectable()

export class AuthInterceptorService implements HttpInterceptor {
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.authService.isAuthenticated()) {
      req = req.clone({
        setHeaders: {
          Authorization: this.authService.getToken()!
        }
      }); 
    }
    return next.handle(req).pipe(
      catchError((e: HttpErrorResponse): Observable<HttpResponse<any>> => {
        return this.handleExpiresToken(e);
      })
    )
  }

  private handleExpiresToken(e: HttpErrorResponse): Observable<HttpResponse<any>> {
    if (e.status === 401) {
      this.router.navigate(['/login'], {
        queryParams: {
          tokenExpired: true
        }
      });
    }
    return throwError(() => new Error(e.error.message));
  }
  
}