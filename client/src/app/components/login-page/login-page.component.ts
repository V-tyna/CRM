import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormGroupDirective } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { AuthService } from 'src/app/shared/services/auth.service';
import { PopupService } from 'src/app/shared/services/popup.service';
import { getErrorMessage } from '../../utils/error-form-handlers';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css'],
  providers: [PopupService]
})
export class LoginPageComponent implements OnInit, OnDestroy {
  public hide = true;
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
    private route: ActivatedRoute,
    private popupService: PopupService
  ) {}

  public ngOnInit(): void {
    this.route.queryParams.subscribe((params: Params) => {
      if (params['registered']) {
        this.popupService.showMessage('Now you can login in system by using your data.');
      } else if (params['accessDenied']) {
        this.popupService.showMessage('You should sign in first.');
      } else if (params['tokenExpired']) {
        this.popupService.showMessage('The token has expired.');
      }
    });
  }

  public errorHandler(filedName: string): string {
    return getErrorMessage(filedName, this.loginForm);
  }

  public onSubmit(form: FormGroupDirective): void  {
    const { email, password } = this.loginForm.value;
    if (email && password) {
      this.loginSubscription = this.authService.login({ email, password }).subscribe({
        next: () => this.router.navigate(['/overview']),
        error: (e) => {
          console.log('here', e);

          this.popupService.showMessage(e);
        }
      });
    }
    this.loginForm.reset();
    form.resetForm();
  }

  public ngOnDestroy(): void  {
    this.loginSubscription?.unsubscribe();
  }
}
