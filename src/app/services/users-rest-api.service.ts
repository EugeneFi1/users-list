import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { delay, Observable } from 'rxjs';
import { ARTIFICIAL_BE_DELAY } from '../config/const';
import { USERS_ROUTES } from '../config/routes';
import { Post } from '../models/post.model';
import { User } from '../models/user.model';
import { buildPath } from '../utils/build-path';

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

  public createUser(user: User): Observable<User> {
    return this.httpClient.post<User>(USERS_ROUTES.USERS, user);
  }

  public updateUser(userId: string, updatedUser: User): Observable<User> {
    const path = buildPath(USERS_ROUTES.USER, { userId });
    return this.httpClient.put<User>(path, updatedUser);
  }

  public removeUser(userId: string): Observable<void> {
    const path = buildPath(USERS_ROUTES.USER, { userId });
    return this.httpClient.delete<void>(path);
  }

  public getUserPosts(userId: string): Observable<Post[]> {
    const path = buildPath(USERS_ROUTES.USER_POSTS, { userId });
    return this.httpClient.get<Post[]>(path);
  }
}
