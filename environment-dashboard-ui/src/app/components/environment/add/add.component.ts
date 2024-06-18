import {Component, Inject} from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogConfig,
  MatDialogContent, MatDialogRef,
  MatDialogTitle
} from "@angular/material/dialog";
import {MatButton} from "@angular/material/button";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {FormBuilder, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatRow} from "@angular/material/table";

@Component({
  selector: 'app-add',
  standalone: true,
  imports: [
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatButton,
    MatDialogClose,
    MatFormField,
    MatInput,
    MatLabel,
    ReactiveFormsModule,
    MatRow
  ],
  templateUrl: './add.component.html',
  styleUrl: './add.component.scss'
})
export class AddComponent {
  form = this.fb.group({
    name: ['', Validators.required]
  })

  constructor(private fb: FormBuilder, private dialogRef: MatDialogRef<AddComponent>) {
  }

  close() {
    this.dialogRef.close();
  }

  addUser() {
    this.dialogRef.close(this.form.value);
  }
}

export function addEnvironmentDialog(dialog: MatDialog) {
  const config = new MatDialogConfig();
  config.disableClose = true;
  config.autoFocus = true;
  config.data = {}

  const dialogRef = dialog.open(AddComponent, config);
  return dialogRef.afterClosed();
}
