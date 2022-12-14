import { Component, OnInit } from '@angular/core';
import { AuthService } from './shared/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'CRM';
  constructor(
    private authService: AuthService
  ) {}

  public ngOnInit(): void {
    const potentialToken = localStorage.getItem('auth-token');
    if (potentialToken) {
      this.authService.setToken(potentialToken);
    }
  }
}
