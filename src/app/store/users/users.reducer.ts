import { createReducer, on } from '@ngrx/store';
import { USERS_ACTIONS, USERS_API_ACTIONS } from './users.actions';
import { usersInitialState } from './users.state';

export const usersReducer = createReducer(
  usersInitialState,
  on(USERS_ACTIONS.loadUsers, (state) => ({
    ...state,
    isLoading: true,
  })),
  on(USERS_API_ACTIONS.loadUsersSuccess, (state, action) => ({
    ...state,
    isLoading: false,
    users: action.users,
  })),
  on(USERS_ACTIONS.selectUser, (state, action) => ({
    ...state,
    selectedUser: action.user,
  }))
);
