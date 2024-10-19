import { AsyncPipe } from '@angular/common';
import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Store } from '@ngrx/store';
import { ConfirmationDialogModel } from '../../models/confirmation-dialog.model';
import { User } from '../../models/user.model';
import { DISPLAYED_COLUMNS } from '../../models/users-table.model';
import { USERS_ACTIONS } from '../../store/users/users.actions';
import { allUsersSelector } from '../../store/users/users.selectors';
import { ConfirmationDialogComponent } from '../shared/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-users-table',
  templateUrl: './users-table.component.html',
  styleUrl: './users-table.component.less',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    AsyncPipe,
    MatButtonModule,
    MatIconModule,
  ],
  standalone: true,
})
export class UsersTableComponent implements OnInit {
  public _displayedColumns: string[] = DISPLAYED_COLUMNS;
  public _dataSource = new MatTableDataSource();
  private destroyRef = inject(DestroyRef);

  constructor(private store: Store, private dialog: MatDialog) {}

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
    window.open('users/' + user.id);
    this.store.dispatch(USERS_ACTIONS.selectUser({ user }));
  }

  public _updateUser(event: MouseEvent, user: User): void {
    event.stopImmediatePropagation();
    console.log(user);
  }

  public _openDialog(event: MouseEvent, user: User): void {
    event.stopImmediatePropagation();
    this.dialog
      .open<unknown, ConfirmationDialogModel>(ConfirmationDialogComponent, {
        data: {
          text: `You are about to delete the user 'Name: ${user.name}, Username: ${user.username}'. Do you want to proceed?`,
        },
      })
      .afterClosed()
      .subscribe((confirmed) => {
        if (confirmed) {
          this.store.dispatch(USERS_ACTIONS.deleteUser({ userId: user.id }));
        }
      });
  }
}
