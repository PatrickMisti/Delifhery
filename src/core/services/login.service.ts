import {inject, Injectable} from '@angular/core';
import Keycloak, {KeycloakTokenParsed} from 'keycloak-js';

@Injectable({
  providedIn: 'root',
})
class LoginService {
  private _localStorageTokenName = 'access_token';

  private _keycloak: Keycloak = inject(Keycloak);

  isLoggedIn(): boolean {
    return this._keycloak.authenticated && localStorage.getItem(this._localStorageTokenName) !== null;
  }

  login(): Promise<boolean> {
    console.log('login');

    if (this._keycloak.authenticated) {
      localStorage.setItem(this._localStorageTokenName, this._keycloak.token || '');
      return Promise.resolve(true);
    }

    return this._keycloak.login({redirectUri: window.location.origin})
      .then(r => {
        localStorage.setItem(this._localStorageTokenName, JSON.stringify(this._keycloak.token));
        if (this.isLoggedIn()) {
          console.log("Login successful: ", this._keycloak.authenticated);
          localStorage.setItem(this._localStorageTokenName, this._keycloak.token || '');
          return true;
        }
        return false;
      })
      .catch(e => {
        console.log("error during login: ", e);
        return false;
      });
    /*try {


    } catch (e) {
      console.error("Login failed: ", e);
      /!*return false;*!/
    }*/
  }

  getUserProfile(): KeycloakTokenParsed | null {
    if (!this.isLoggedIn()) {
      return null;
    }
    return this._keycloak?.tokenParsed || null;
  }

  logout(): void {
    this._keycloak.logout({redirectUri: window.location.origin}).then(r => console.log("Logged out: ", this._keycloak.authenticated));
  }
}

export default LoginService
