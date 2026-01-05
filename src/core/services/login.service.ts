import {inject, Injectable} from '@angular/core';
import Keycloak, {KeycloakTokenParsed} from 'keycloak-js';
import {localStorageTokenName} from '../utilities/key-cloak-init';

@Injectable({
  providedIn: 'root',
})
class LoginService {
  private _keycloak: Keycloak = inject(Keycloak);

  isLoggedIn(): boolean {
    return this._keycloak.authenticated && localStorage.getItem(localStorageTokenName) !== null;
  }

  isAuthenticated(): boolean {
    return this._keycloak.authenticated;
  }

  async login(): Promise<boolean> {
    console.log('login');

    if (this._keycloak.authenticated) {
      localStorage.setItem(localStorageTokenName, this._keycloak.token || '');
      return Promise.resolve(true);
    }

    try {
      await this._keycloak.login().then(_ => console.log("keycloak login response: "));
      localStorage.setItem(localStorageTokenName, this._keycloak.token || '');
      if (this.isLoggedIn()) {
        console.log("Login successful: ", this._keycloak.authenticated);
        return true;
      }
      return false;
    } catch (e) {
      console.log("error during login: ", e);
      return false;
    }
  }

  getUserProfile(): KeycloakTokenParsed | null {
    if (!this.isLoggedIn()) {
      return null;
    }
    return this._keycloak?.tokenParsed || null;
  }

  async logout(): Promise<void> {
    await this._keycloak.logout({redirectUri: window.location.origin});
    console.log("Logged out: ", this._keycloak.authenticated)
  }
}

export default LoginService
