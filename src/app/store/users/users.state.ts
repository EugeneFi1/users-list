import { Post } from '../../models/post.model';
import { User } from '../../models/user.model';

export interface UsersState {
  isLoading: boolean;
  users: User[];
}

export const usersInitialState: UsersState = {
  isLoading: false,
  users: [],
};
