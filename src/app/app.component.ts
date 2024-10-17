import { Component, OnInit } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterOutlet } from '@angular/router';
import { Store } from '@ngrx/store';
import { UsersTableComponent } from './components/users-table/users-table.component';
import { UsersRestApiService } from './services/users-rest-api.service';
import { USERS_ACTIONS, USERS_API_ACTIONS } from './store/users/users.actions';
import {
  allUsersSelector,
  selectedUserSelector,
  selectUsersState,
} from './store/users/users.selectors';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MatToolbarModule, UsersTableComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.less',
})
export class AppComponent implements OnInit {
  constructor(private store: Store) {}

  public ngOnInit(): void {
    this.store.dispatch(USERS_ACTIONS.loadUsers());
  }
}
