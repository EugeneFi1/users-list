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

  public getUserPosts(userId: string): Observable<Post[]> {
    const path = buildPath(USERS_ROUTES.USER_POSTS, { userId });
    return this.httpClient.get<Post[]>(path);
  }
}
