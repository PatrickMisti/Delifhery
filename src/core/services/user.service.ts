import {inject, Injectable} from '@angular/core';
import {IUserService} from './interfaces';
import {User} from "../models/user";
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, firstValueFrom, map, Observable, tap} from 'rxjs';
import {IncludeShipment} from '../models/enum-types';
import LoginService from './login.service';
import {CreateUserDto} from './dto/create-user-dto';
import {localStorageTokenName} from '../utilities/key-cloak-init';

@Injectable({
  providedIn: 'root',
})
export class UserService implements IUserService {

  private _http: HttpClient = inject(HttpClient);
  private _loginService = inject(LoginService);
  private _currentUser = new BehaviorSubject<User | null>(null);

  isCurrentUser$(): BehaviorSubject<User|null> {
    return this._currentUser;
  }

  getUserById(userId: number): Observable<User> {
    return this._http.get<User>(`api/user/${userId}`, {
      params: {
        includeAddress: true,
        includeShipment: IncludeShipment.Both,
      }
    })
      .pipe(map(json => User.fromJson(json)));
  }

  async login() {
    console.log('user service login called');
    if (this._loginService.isLoggedIn() && this._currentUser.value) return true;

    if (this._loginService.isLoggedIn() && !this._currentUser.value) {
      await this._updateUser();
    }

    try {
      const loggedIn = await this._loginService.login();
      if (loggedIn) {
        await this._updateUser();
      }
      return loggedIn;
    } catch (error) {
      console.error('Login failed:', error);
      return false;
    }
  }

  isLoggedIn(): boolean {
    return this._loginService.isLoggedIn();
  }

  isAuthenticated(): boolean {
    return this._loginService.isAuthenticated();
  }

  async logout(): Promise<void> {
    await this._loginService.logout();
    this._currentUser.next(null);
    localStorage.removeItem(localStorageTokenName);
  }

  private async _updateUser() {
    const user = await this._getCurrentUser();
    this._currentUser.next(user);
    return !!user;
  }

  private async _getCurrentUser() {
    const profile = this._loginService.getUserProfile();
    if (!profile?.sub) return null;

    try {
      const user = await firstValueFrom(
        this._http.get<User>(`api/user/subject/${profile.sub}`,{observe: 'response'}).pipe(
          tap(data => {
            if (data.status >= 400) {
              throw new Error("System error while fetching user data.");
            }
          }),
          map(response => {
            if (response.status == 204) return null;

            const json = response.body as User;
            return User.fromJson(json);
          })
        )
      );

      if (user) {
        return user;
      }

      console.log("Info ", this._loginService.getUserProfile());

      const newUser = CreateUserDto.fromProfile(this._loginService.getUserProfile());
      if (!newUser) return null;

      return await firstValueFrom(
        this._http.post<User>('api/user/', newUser).pipe(
          map(json => User.fromJson(json))
        )
      );
    } catch (error) {
      console.error('Error fetching current user:', error);
      return null;
    }
  }
}
