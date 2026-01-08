import {inject} from '@angular/core';
import {LoginService} from './login.service';
import {
  CanActivateFn,
  Router,
} from '@angular/router';

export const authGuard: CanActivateFn = () => {
  const auth = inject(LoginService);
  const router = inject(Router);

  return auth.isLoggedIn()
    ? true
    : router.createUrlTree(['/statistics']);
};
