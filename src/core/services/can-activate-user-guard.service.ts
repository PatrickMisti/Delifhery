import {inject} from '@angular/core';
import {LoginService} from './login.service';
import {CanActivateFn, Router} from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';

export const authGuard: CanActivateFn = () => {
  const auth = inject(LoginService);
  const router = inject(Router);
  const snack = inject(MatSnackBar);
  console.log("Auth Guard: is logged in? ", auth.isLoggedIn());
  if (!auth.isLoggedIn()) {
    router.navigate(['/add']);
    snack.open('Du bist nicht eingeloggt. Bitte melde dich an, um auf diese Seite zuzugreifen.', 'OK', {duration: 5000});
    return false;
  }
  return true;
};
