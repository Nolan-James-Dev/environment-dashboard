import {Component, effect, inject, OnInit, signal} from '@angular/core';
import {FormBuilder, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatButton} from "@angular/material/button";
import {
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogConfig,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from "@angular/material/dialog";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatOption, MatSelect} from "@angular/material/select";
import {
  MatDatepicker,
  MatDatepickerInput,
  MatDatepickerModule,
  MatDatepickerToggle
} from "@angular/material/datepicker";
import {MatNativeDateModule} from "@angular/material/core";
import {UserService} from "../../../services/user/user.service";
import {User} from "../../../models/User.model";
import {NgForOf} from "@angular/common";
import {EnvironmentService} from "../../../services/environment/environment.service";
import {Environment} from "../../../models/Environment.model";
import {BookingService} from "../../../services/booking/booking.service";
import {TimeSlot} from "../../../models/TimeSlot.model";
import moment from "moment";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-add',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerInput,
    MatDatepickerToggle,
    MatDatepicker,
    MatDatepickerModule,
    MatDialogContent,
    MatSelect,
    MatOption,
    MatButton,
    MatDialogActions,
    MatDialogClose,
    MatDialogTitle,
    NgForOf,
  ],
  providers: [MatDatepickerModule],
  templateUrl: './add.component.html',
  styleUrl: './add.component.scss'
})
export class AddComponent implements OnInit {
  environmentService = inject(EnvironmentService);
  userService = inject(UserService);
  bookingService = inject(BookingService);

  // environments = signal<Environment[]>([]);
  // users = signal<User[]>([]);
  users: User[] | undefined;
  environments: Environment[] | undefined;
  timeslots = signal<TimeSlot[]>([]);


  form = this.fb.group({
    username: ['', Validators.required],
    environmentName: ['', Validators.required],
    date: ['', Validators.required],
    startTime: ['', Validators.required],
    endTime: ['', Validators.required],
    reason: ['', Validators.required]
  })

  constructor(private fb: FormBuilder, private dialogRef: MatDialogRef<AddComponent>, private _snackBar: MatSnackBar) {
    effect(() => {
      const allUsers = this.userService.allUsers().value;
      if (allUsers) {
        this.users = allUsers;
      }
      const allEnvironments = this.environmentService.allEnvironments().value;
      if (allEnvironments) {
        this.environments = allEnvironments;
      }
    });

    // this.loadAllEnvironments();
    // this.loadAllUsers();
    this.loadAllTimeslots();
  }

  ngOnInit(): void {
    this.getUsers();
    this.getEnvironments();
  }

  private getUsers() {
    this.userService.getUsers();
  }

  private getEnvironments() {
    this.environmentService.getEnvironments();
  }

  close() {
    this.dialogRef.close();
  }

  addBooking() {
    this.form.value.date = moment(this.form.value.date).format("DD/MM/yyyy");
    this.dialogRef.close(this.form.value);
    this._snackBar.open('Booking successfully created', '', {
      duration: 3000,
      panelClass: ['custom-style']
    });
  }

  weekdayFilter = (d: Date | null): boolean => {
    const day = (d || new Date()).getDay();
    return day !== 0 && day !== 6;
  };

  // private async loadAllEnvironments() {
  //   try {
  //     const environments = await this.environmentService.loadAllEnvironments();
  //     this.environments.set(environments);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // }

  // private async loadAllUsers() {
  //   try {
  //     const users = await this.userService.loadAllUsers();
  //     this.users.set(users);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // }

  private async loadAllTimeslots() {
    try {
      const timeslots = await this.bookingService.getAllTimeslots();
      this.timeslots.set(timeslots);
      console.log(timeslots);
    } catch (err) {
      console.log(err);
    }
  }
}

export function addBookingDialog(dialog: MatDialog) {
  const config = new MatDialogConfig();
  config.disableClose = true;
  config.autoFocus = true;
  config.data = {}

  const dialogRef = dialog.open(AddComponent, config);
  return dialogRef.afterClosed();
}
