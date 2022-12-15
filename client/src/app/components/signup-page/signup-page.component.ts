import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators, FormGroupDirective } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { AuthService } from 'src/app/shared/services/auth.service';
import { PopupService } from 'src/app/shared/services/popup.service';
import { getErrorMessage } from 'src/app/utils/error-form-handlers';

@Component({
  selector: 'app-signup-page',
  templateUrl: './signup-page.component.html',
  styleUrls: ['./signup-page.component.css'],
  providers: [PopupService]
})
export class SignupPageComponent implements OnInit, OnDestroy {
  public hide =true;
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
    private route: ActivatedRoute,
    private popupService: PopupService
  ) {}

  public ngOnInit(): void {

  }

  public errorHandler(filedName: string): string {
    return getErrorMessage(filedName, this.signupForm);
  }

  public onSubmit(form: FormGroupDirective): void {
    const { email, password } = this.signupForm.value;
    if (email && password) {
      this.authSubscription = this.authService.singup({ email, password }).subscribe({
        next: () => this.router.navigate(['/login'], {
          queryParams: {
            registered: true
          }
        }),
        error: (e) => {
          this.popupService.showMessage(e);
        }
    });
    }
    this.signupForm.reset();
    form.resetForm();
  }

  public ngOnDestroy(): void {
      this.authSubscription?.unsubscribe();
  }
}
