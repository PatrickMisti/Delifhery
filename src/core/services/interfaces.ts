import {User} from '../models/user';
import {Observable} from 'rxjs';

export interface IUserService {
  getUserById(userId: number) : Observable<User>;
  login() : Promise<boolean>;
  isLoggedIn() : boolean;
  logout() : Promise<void>;
}
