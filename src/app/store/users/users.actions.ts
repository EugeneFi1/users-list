import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { User } from '../../models/user.model';

export const USERS_ACTIONS = createActionGroup({
  source: 'Users',
  events: {
    'Load Users': emptyProps,
    'Select User': props<{ user: User }>(),
  },
});

export const USERS_API_ACTIONS = createActionGroup({
  source: 'Users Api',
  events: {
    'Load Users Success': props<{ users: User[] }>(),
    'Load Users Failure': props<{ error: string }>(),
  },
});
