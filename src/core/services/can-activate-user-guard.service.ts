import {inject} from '@angular/core';
import {LoginService} from './login.service';
import {CanActivateFn} from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';

export const authGuard: CanActivateFn = () => {
  const auth = inject(LoginService);
  const snack = inject(MatSnackBar);
  console.log("Auth Guard: is logged in? ", auth.isLoggedIn());
  if (!auth.isLoggedIn()) {
    snack.open('Du bist nicht eingeloggt. Bitte melde dich an, um auf diese Seite zuzugreifen.', 'OK', {duration: 5000});
    return false;
  }
  return true;
};
