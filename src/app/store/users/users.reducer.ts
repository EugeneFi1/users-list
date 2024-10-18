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
  })),
  on(USERS_API_ACTIONS.createUserSuccess, (state, { user }) => ({
    ...state,
    selectedUser: user,
    users: [...state.users, user],
  })),
  on(USERS_API_ACTIONS.updateUserSuccess, (state, { user }) => ({
    ...state,
    selectedUser: user,
    users: state.users.map((stateUser) =>
      stateUser.id === user.id ? user : stateUser
    ),
  })),
  on(USERS_API_ACTIONS.deleteUserSuccess, (state, { userId }) => ({
    ...state,
    users: state.users.filter((user) => user.id !== userId),
  }))
);
