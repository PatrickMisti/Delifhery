import {inject, Injectable} from '@angular/core';
import Keycloak, {KeycloakTokenParsed} from 'keycloak-js';
import {localStorageTokenName} from '../utilities/key-cloak-init';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private _keycloak: Keycloak = inject(Keycloak);

  isLoggedIn(): boolean {
    return this._keycloak.authenticated && localStorage.getItem(localStorageTokenName) !== null;
  }

  isAuthenticated(): boolean {
    return this._keycloak.authenticated;
  }

  updateLocalStorageToken() {
    if (this._keycloak.token) {
      localStorage.setItem(localStorageTokenName, this._keycloak.token);
    }
  }

  async login() {
    if (this._keycloak.authenticated) {
      this.updateLocalStorageToken()
      return;
    }

    await this._keycloak.login().then(_ => console.log("keycloak login response: "));
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
