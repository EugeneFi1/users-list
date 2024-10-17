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

  constructor(
    private actions$: Actions,
    private usersService: UsersRestApiService
  ) {}
}
