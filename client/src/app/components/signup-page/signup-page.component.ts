import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { AuthService } from 'src/app/shared/services/auth.service';
import { getErrorMessage } from 'src/app/utils/error-form-handlers';

@Component({
  selector: 'app-signup-page',
  templateUrl: './signup-page.component.html',
  styleUrls: ['./signup-page.component.css']
})
export class SignupPageComponent implements OnInit, OnDestroy {
  public signupForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required, 
      Validators.minLength(6),
      Validators.maxLength(56), 
      Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{6,}$')])
  });

  private authSubscription?: Subscription;

  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  public ngOnInit(): void {
      
  }

  public errorHandler(filedName: string): string {
    return getErrorMessage(filedName, this.signupForm);
  }

  public onSubmit(): void {
    const { email, password } = this.signupForm.value;
    if (email && password) {
      this.authSubscription = this.authService.singup({ email, password }).subscribe(
        () => this.router.navigate(['/login', {
          queryParams: {
            registered: true
          }
        }])
      );
    }
    this.signupForm.reset();
  }

  public ngOnDestroy(): void {
      this.authSubscription?.unsubscribe();
  }
}
