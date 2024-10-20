import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { User } from '../../models/user.model';

export const USERS_ACTIONS = createActionGroup({
  source: 'Users',
  events: {
    'Load Users': emptyProps,
    'Create User': props<{ user: User }>(),
    'Update User': props<{ user: User }>(),
    'Delete User': props<{ userId: string }>(),
  },
});

export const USERS_API_ACTIONS = createActionGroup({
  source: 'Users Api',
  events: {
    'Load Users Success': props<{ users: User[] }>(),
    'Load Users Failure': props<{ error: string }>(),
    'Create User Success': props<{ user: User }>(),
    'Create User Failure': props<{ error: string }>(),
    'Update User Success': props<{ user: User }>(),
    'Update User Failure': props<{ error: string }>(),
    'Delete User Success': props<{ userId: string }>(),
    'Delete User Failure': props<{ error: string }>(),
  },
});
