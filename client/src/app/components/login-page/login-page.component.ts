import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { AuthService } from 'src/app/shared/services/auth.service';
import { getErrorMessage } from '../../utils/error-form-handlers';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit, OnDestroy {
  public loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required, 
      Validators.minLength(6), 
      Validators.maxLength(56), 
      Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{6,}$')])
  });
  private loginSubscription?: Subscription;

  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  public ngOnInit(): void {
    this.route.queryParams.subscribe((params: Params) => {
      if (params['registered']) {
       'Now you can login in system by using your data.'
      } else if(params['accessDenied']) {
        'You should sign up first.'
      }
    });
  }

  public errorHandler(filedName: string): string {
    return getErrorMessage(filedName, this.loginForm);
  }

  public onSubmit(): void  {
    const { email, password } = this.loginForm.value;
    if (email && password) {
      this.loginSubscription = this.authService.login({ email, password }).subscribe(
        () => this.router.navigate(['/overview'])
      );
    }
    this.loginForm.reset();
  }

  public ngOnDestroy(): void  {
    this.loginSubscription?.unsubscribe();
  }
}
