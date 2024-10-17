import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UsersState } from './users.state';

export const selectUsersState = createFeatureSelector<UsersState>('users');

export const allUsersSelector = createSelector(
  selectUsersState,
  (state) => state.users
);

export const selectedUserSelector = createSelector(
  selectUsersState,
  (state) => state.selectedUser
);
