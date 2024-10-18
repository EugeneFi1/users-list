import { Routes } from '@angular/router';
import { UsersTableComponent } from './components/users-table/users-table.component';
import { UserPostsComponent } from './components/user-posts/user-posts.component';

export const routes: Routes = [
  {
    path: 'users',
    component: UsersTableComponent,
  },
  { path: '', redirectTo: '/users', pathMatch: 'full' },
  { path: 'users/:id', component: UserPostsComponent },
];
