import { AsyncPipe } from '@angular/common';
import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Store } from '@ngrx/store';
import { User } from '../../models/user.model';
import { allUsersSelector } from '../../store/users/users.selector';
import { USERS_ACTIONS } from '../../store/users/users.actions';
import { DISPLAYED_COLUMNS } from '../../models/users-table.model';

@Component({
  selector: 'app-users-table',
  templateUrl: './users-table.component.html',
  styleUrl: './users-table.component.less',
  imports: [MatFormFieldModule, MatInputModule, MatTableModule, AsyncPipe],
  standalone: true,
})
export class UsersTableComponent implements OnInit {
  public _displayedColumns: string[] = DISPLAYED_COLUMNS;
  public _dataSource = new MatTableDataSource();
  public _selectedUserId?: number;
  private destroyRef = inject(DestroyRef);

  constructor(private store: Store) {}

  public ngOnInit(): void {
    this.store
      .select(allUsersSelector)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((users) => {
        this._dataSource.data = users;
      });
  }

  public _applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this._dataSource.filter = filterValue.trim().toLowerCase();
  }

  public _selectUser(user: User): void {
    // window.open();
    this._selectedUserId = user.id;
    this.store.dispatch(USERS_ACTIONS.selectUser({ user }));
  }
}
