import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { delay, Observable } from 'rxjs';
import { ARTIFICIAL_BE_DELAY } from '../config/const';
import { USERS_ROUTES } from '../config/routes';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class UsersRestApiService {
  constructor(private httpClient: HttpClient) {}

  public getUsersList(): Observable<User[]> {
    return this.httpClient
      .get<User[]>(USERS_ROUTES.USERS)
      .pipe(delay(ARTIFICIAL_BE_DELAY));
  }
}
