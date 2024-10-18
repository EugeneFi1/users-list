import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of } from 'rxjs';
import { UsersRestApiService } from '../../services/users-rest-api.service';
import { USERS_ACTIONS, USERS_API_ACTIONS } from './users.actions';

@Injectable()
export class UsersEffects {
  loadUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(USERS_ACTIONS.loadUsers),
      mergeMap(() =>
        this.usersService.getUsersList().pipe(
          map((users) => USERS_API_ACTIONS.loadUsersSuccess({ users })),
          catchError((error) =>
            of(USERS_API_ACTIONS.loadUsersFailure({ error: error.message }))
          )
        )
      )
    )
  );

  createUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(USERS_ACTIONS.createUser),
      mergeMap(({ user }) =>
        this.usersService.createUser(user).pipe(
          map((user) => USERS_API_ACTIONS.createUserSuccess({ user })),
          catchError((error) =>
            of(USERS_API_ACTIONS.createUserFailure({ error: error.message }))
          )
        )
      )
    )
  );

  updateUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(USERS_ACTIONS.updateUser),
      mergeMap(({ user }) =>
        this.usersService.updateUser(user.id, user).pipe(
          map((user) => USERS_API_ACTIONS.updateUserSuccess({ user })),
          catchError((error) =>
            of(USERS_API_ACTIONS.updateUserFailure({ error: error.message }))
          )
        )
      )
    )
  );

  deleteUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(USERS_ACTIONS.deleteUser),
      mergeMap(({ userId }) =>
        this.usersService.removeUser(userId).pipe(
          map(() => USERS_API_ACTIONS.deleteUserSuccess({ userId })),
          catchError((error) =>
            of(USERS_API_ACTIONS.deleteUserFailure({ error: error.message }))
          )
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private usersService: UsersRestApiService
  ) {}
}
