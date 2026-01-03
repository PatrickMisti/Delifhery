import {Injectable} from '@angular/core';
import {IUserService} from './interfaces';
import {User} from "../models/user";
import {HttpClient} from '@angular/common/http';
import {map, Observable} from 'rxjs';
import {IncludeShipment} from '../models/enum-types';

@Injectable({
  providedIn: 'root',
})
export class UserService implements IUserService {

  constructor(private http: HttpClient) {}

  getUserById(userId: number): Observable<User> {
    return this.http.get<User>(`api/user/${userId}`, {
      params: {
        includeAddress: true,
        includeShipment: IncludeShipment.Both,
      }})
      .pipe(map(json => User.fromJson(json)));
  }
}
