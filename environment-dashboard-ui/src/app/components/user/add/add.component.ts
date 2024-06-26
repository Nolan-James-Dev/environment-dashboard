import {Component} from '@angular/core';
import {
  MatDialog,
  MatDialogActions,
  MatDialogClose, MatDialogConfig,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from "@angular/material/dialog";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {FormBuilder, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatInput} from "@angular/material/input";
import {MatButton} from "@angular/material/button";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-add',
  standalone: true,
  imports: [
    FormsModule,
    MatButton,
    MatDialogActions,
    MatDialogClose,
    MatDialogContent,
    MatDialogTitle,
    MatFormField,
    MatInput,
    MatLabel,
    ReactiveFormsModule
  ],
  templateUrl: './add.component.html',
  styleUrl: './add.component.scss'
})
export class AddComponent {
  form = this.fb.group({
    username: ['', Validators.required]
  })

  constructor(private fb: FormBuilder, private dialogRef: MatDialogRef<AddComponent>, private _snackBar: MatSnackBar) {

  }

  close() {
    this.dialogRef.close();
  }

  addUser() {
    this.dialogRef.close(this.form.value);
    this._snackBar.open('User successfully created', '', {
      duration: 3000,
      panelClass: ['custom-style']
    });
  }
}

export function addUserDialog(dialog: MatDialog) {
  const config = new MatDialogConfig();
  config.disableClose = true;
  config.autoFocus = true;
  config.data = {}

  const dialogRef = dialog.open(AddComponent, config);
  return dialogRef.afterClosed();
}
