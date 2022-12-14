import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { User } from 'src/app/models/user';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  private token: string | null = null;

  constructor(private http: HttpClient) {}

  public isAuthenticated(): boolean {
    return !!this.token;
  }

  public getToken(): string | null {
    return this.token;
  }

  public login(user: User): Observable<{token: string}>{
    return this.http.post<{token: string}>('/api/auth/login', user)
      .pipe(
        tap(({ token }) => {
          localStorage.setItem('auth-token', token);
          this.setToken(token);
        })
      )
  }

  public logout(): void {
    this.setToken(null);
    localStorage.removeItem('auth-token');
  }
  
  public setToken(token: string | null) {
    this.token = token;
  }

  public singup(user: User): Observable<User> {
    return this.http.post<User>('/api/auth/signup', user);
  }
}