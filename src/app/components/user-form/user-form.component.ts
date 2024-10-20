import { Component, inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Store } from '@ngrx/store';
import { UserFormDialogData } from '../../models/user-form.mode';
import { USERS_ACTIONS } from '../../store/users/users.actions';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.less',
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogContent,
    MatDialogActions,
    MatDialogTitle,
    MatButtonModule,
  ],
  standalone: true,
})
export class UserFormComponent implements OnInit {
  public form!: FormGroup;
  public _editMode?: boolean;
  private readonly data? = inject<UserFormDialogData>(MAT_DIALOG_DATA);
  private readonly dialogRef = inject(MatDialogRef<UserFormComponent>);

  constructor(private fb: FormBuilder, private store: Store) {}

  public ngOnInit(): void {
    this._editMode = !!this.data?.user;

    this.form = this.getFormGroup();
  }

  public _cancel(): void {
    this.dialogRef.close();
  }

  public _confirm(): void {
    const user = { user: this.form.value };
    this.store.dispatch(
      this._editMode
        ? USERS_ACTIONS.updateUser(user)
        : USERS_ACTIONS.createUser(user)
    );
    this.dialogRef.close();
  }

  private getFormGroup(): FormGroup {
    const selectedUser = this.data?.user;
    return this.fb.group({
      id: [selectedUser?.id ?? null], // id is required for update user operation
      name: [selectedUser?.name ?? '', [Validators.required]],
      username: [selectedUser?.username ?? '', [Validators.required]],
      email: [
        selectedUser?.email ?? '',
        [Validators.required, Validators.email],
      ],
      website: [selectedUser?.website ?? ''],
    });
  }
}
