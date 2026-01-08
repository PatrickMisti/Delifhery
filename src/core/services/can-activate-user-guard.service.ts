import {inject} from '@angular/core';
import {LoginService} from './login.service';
import {
  CanActivateFn,
  Router,
} from '@angular/router';

export const authGuard: CanActivateFn = () => {
  const auth = inject(LoginService);
  const router = inject(Router);
  console.log("Auth Guard: is logged in? ", auth.isLoggedIn());
  if (!auth.isLoggedIn()) {
    auth.login();
    return false;
  }
  return true;
};
