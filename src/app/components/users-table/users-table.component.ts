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
import { map, mergeMap, ReplaySubject } from 'rxjs';
import { ConfirmationDialogModel } from '../../models/confirmation-dialog.model';
import { User } from '../../models/user.model';
import {
  ConfirmationDialogTriggerModel,
  DISPLAYED_COLUMNS,
} from '../../models/users-table.model';
import { USERS_ACTIONS } from '../../store/users/users.actions';
import { allUsersSelector, isLoadingSelector } from '../../store/users/users.selectors';
import { ConfirmationDialogComponent } from '../shared/confirmation-dialog/confirmation-dialog.component';
import { UserFormComponent } from '../user-form/user-form.component';
import { UserFormDialogData } from '../../models/user-form.mode';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

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
    MatProgressSpinnerModule
  ],
  standalone: true,
})
export class UsersTableComponent implements OnInit {
  public _displayedColumns: string[] = DISPLAYED_COLUMNS;
  public _dataSource = new MatTableDataSource();
  public _isLoading$ = this.store.select(isLoadingSelector);
  private confirmationDialogTrigger$ =
    new ReplaySubject<ConfirmationDialogTriggerModel>();
  private destroyRef = inject(DestroyRef);

  constructor(private store: Store, private dialog: MatDialog) {}

  public ngOnInit(): void {
    this.store.dispatch(USERS_ACTIONS.loadUsers());
    
    this.store
      .select(allUsersSelector)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((users) => {
        this._dataSource.data = users;
      });

    this.confirmationDialogTrigger$
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        mergeMap((payload) =>
          this.dialog
            .open<unknown, ConfirmationDialogModel>(
              ConfirmationDialogComponent,
              {
                data: {
                  text: payload.text,
                },
              }
            )
            .afterClosed()
            .pipe(
              map((isConfirmed) => ({
                isConfirmed,
                confirmFn: payload.confirmFn,
              }))
            )
        )
      )
      .subscribe((result) => result.confirmFn(result.isConfirmed));
  }

  public _applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this._dataSource.filter = filterValue.trim().toLowerCase();
  }

  public _openUserPosts(user: User): void {
    window.open('users/' + user.id);
  }

  public _openCreateUserDialog(): void {
    this.openUserFormDialog();
  }

  public _openUpdateUserDialog(event: MouseEvent, user: User): void {
    event.stopImmediatePropagation();
    this.openUserFormDialog(user);
  }

  public _removeUser(event: MouseEvent, user: User): void {
    event.stopImmediatePropagation();
    this.confirmationDialogTrigger$.next({
      text: `You are about to delete the user 'Name: ${user.name}, Username: ${user.username}'. Do you want to proceed?`,
      confirmFn: (isConfirmed) => {
        if (isConfirmed) {
          this.store.dispatch(USERS_ACTIONS.deleteUser({ userId: user.id }));
        }
      },
    });
  }

  private openUserFormDialog(user?: User): void {
    this.dialog.open<unknown, UserFormDialogData>(UserFormComponent, {
      data: {
        user,
      },
    });
  }
}
